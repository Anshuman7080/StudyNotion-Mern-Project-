import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const TagsChip = ({ name, label, errors, register, setValue }) => {
    const [tags, setTags] = useState("");
    const [tagList, setTagList] = useState([]);

    // Register the field name for React Hook Form
    useEffect(() => {
        register(name, { required: true });
    }, [name, register]);

    // Update form value whenever tag list changes
    useEffect(() => {
        setValue(name, tagList);
    }, [name, tagList, setValue]);

    const handleAddTag = () => {
        if (tags.trim()) { // Prevent adding empty tags
            setTagList([...tagList, tags.trim()]);
            setTags(""); // Clear input field
        }
    };

    const handleRemoveTag = (index) => {
        const updatedTagList = tagList.filter((_, i) => i !== index);
        setTagList(updatedTagList);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleAddTag();
        }
    };

    return (
        <div className='flex flex-col gap-2 '>
            <label htmlFor={name}
              className='text-sm text-richblack-25'>
                {label}<sup className='text-pink-500'>*</sup>
            </label>

            {tagList.length > 0 && (
                <ul className='flex gap-2'>
                    {tagList.map((tag, index) => (
                        <li
                            key={index}
                            className='flex items-center  text-richblack-5 bg-yellow-400 rounded-md py-1 px-2'
                        >
                            <span>{tag}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(index)}
                                className='text-xs text-pure-greys-300'
                            >
                                <RxCross2 color="black" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <input
                    type="text"
                    id={name}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-richblack-700 py-1 rounded-md px-3 outline-none"
                    placeholder={`Enter ${label}`} 
                />
            </div>
        </div>
    );
};

export default TagsChip;
