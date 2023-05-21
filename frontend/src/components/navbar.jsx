import React, { useEffect, useState } from "react";
import {  close, menu } from "../assets/assets.jsx";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const fillColor = {
    default: {
        fill: "#ffffff",
        transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
        fill: "#08eaca",
        transition: { duration: 0.5, ease: "easeOut" }
    }
};




const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const currentRoute = useLocation().pathname.toLowerCase();

    const [showDropdown, setShowDropdown] = useState(false);

    const navLinks = [
        {
            id: "about_us",
            title: "About us",
        },
        {
            id: "admin",
            title: "Admin",
        },
        {
            id: "volunteers",
            title: "Volunteers",
        },
        {
            id: "reort_hunger",
            title: "Report Hunger",
        },
    ];
    useEffect(() => {

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <nav
            className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-white" : "bg-white"
                }`}
        >

            <div className='flex-1 flex items-end justify-end sm:items-stretch sm:justify-end'>

                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`relative ${currentRoute.includes(nav.id) ? "text-blue-500" : "text-secondary"
                                } hover:text-blue-500 text-black text-[18px] font-medium cursor-pointer`}
                            onMouseEnter={() => {
                                setActive(nav.title);
                                if (nav.id === "project") {
                                    setShowDropdown(true);
                                }
                            }}
                            onMouseLeave={() => {
                                setActive(null);
                                if (nav.id === "project") {
                                    setShowDropdown(false);
                                }
                            }}
                        >
                            <a href={`${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                    <button className="text-white bg-blue-500 px-5 py-2 rounded-lg flex flex-row justify-center align-middle"><FaHeart className="mr-2"/>uDonate</button>
                </ul>
                




                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <img
                        src={!toggle ? menu : close}
                        alt='menu'
                        className='w-[28px] h-[28px] object-contain'
                        onClick={() => setToggle(!toggle)}
                    />

                    <div
                        className={`${!toggle ? "hidden" : "flex"
                            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
                    >
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                            {navLinks.map((nav) => (

                                <li key={nav.id}
                                    className={`${active === nav.title ? "text-blue-500" : "text-secondary"
                                        } hover:text-blue-500 text-[18px] font-medium cursor-pointer`}
                                    onClick={() => setActive(nav.title)}
                                >
                                    <a href={`${nav.id}`}>{nav.title}</a>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;