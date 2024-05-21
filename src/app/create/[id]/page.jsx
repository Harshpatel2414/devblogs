"use client"

import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Update = ({ params }) => {
    const id = params.id;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [media, setMedia] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { currentUser } = useAuth();
    const router = useRouter();

    if (!currentUser) {
        router.push('/login');
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/blog/${id}`);
            const data = await res.json();
            console.log(data);
            setTitle(data.title);
            setDesc(data.description);
            setImage({
                file: data.image,
                preview: data.image
            });
        }
        fetchData();
    }, [id])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImage({
                    file,
                    preview: URL.createObjectURL(file)
                });
                setMedia(null); // Clear media if an image is selected
            } else if (file.type.startsWith('video/')) {
                setMedia({
                    file,
                    preview: URL.createObjectURL(file)
                });
                setImage(null); // Clear image if a video is selected
            } else {
                console.error('Unsupported file type');
            }
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            const res = await fetch("/api/blog", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description: desc,
                    blogId: id
                }),
            });

            if (res.status === 201) {
                const data = await res.json();
                console.log(data);
                setLoading(false);
                toast.success('Updated successfully');
                router.push("/");
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to publish');
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error('Error publishing blog: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-5 dark:bg-zinc-950  w-full min-h-dvh mx-auto pt-20">
            <div className="flex flex-col gap-5 w-full md:w-3/4 lg:w-2/3">
                <div>
                    <h1 className="text-lg text-rose-400">Add Title</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        className=" bg-transparent p-2 md:py-10 text-4xl md:text-3xl lg:text-[64px] outline-none h-fit w-full dark:bg-zinc-950"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {image && (<div>
                    <div className="w-auto h-full dark:bg-zinc-900 min-h-[360px] md:max-h-[480px] lg:h-[480px] relative">
                        <Image fill src={image.preview} alt="Preview" className="w-auto h-auto md:max-h-[480px] lg:h-[480px] object-contain object-center" />
                    </div>
                </div>
                )}
                {media && (
                    <div className="w-full h-auto py-5 relative">
                        <video controls className="mt-2 w-full lg:max-h-[480px]">
                            <source src={media.preview} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
                <div className="relative flex flex-col gap-5">
                    <button
                        disabled
                        className="p-3 h-fit w-fit rounded-full disabled:opacity-70 bg-rose-100 dark:bg-zinc-900"
                        onClick={() => setOpen(!open)}
                    >
                        <FaPlus className="w-4 h-4 text-red-500" />
                    </button>
                    {open && (
                        <div className="flex items-center gap-4 z-10 absolute left-16 border-l border-red-500 pl-5">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            <button className="p-3 rounded-full bg-rose-100 dark:bg-zinc-900">
                                <label htmlFor="image">
                                    <FaImage className="w-4 h-4 text-red-500" />
                                </label>
                            </button>
                            <input
                                type="file"
                                id="video"
                                accept="video/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            <button className="p-3 rounded-full bg-rose-100 dark:bg-zinc-900">
                                <label htmlFor="video">
                                    <FaVideo className="w-4 h-4 text-red-500" />
                                </label>
                            </button>
                        </div>
                    )}
                    <ReactQuill
                        className="text-zinc-500 w-full texl-xl md:text-3xl dark:bg-zinc-950"
                        theme="bubble"
                        value={desc}
                        onChange={setDesc}
                        placeholder="Write your thoughts here..."
                    />
                </div>
                <button onClick={handlePublish} className="py-2 text-zinc-100 mt-4 px-5 cursor-pointer tracking-wide bg-rose-500 w-fit rounded-lg">
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </div>
    );
};

export default Update;