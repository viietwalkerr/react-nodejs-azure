import React from 'react'
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'About',
        path: '/About',
        icon: <AiIcons.AiFillInfoCircle />,
        cName: 'nav-text',
    },
    {
        title: 'Settings',
        path: '/Settings',
        icon: <AiIcons.AiFillSetting />,
        cName: 'nav-text',
    },
    {
        title: 'Profile',
        path: '/Profile',
        icon: <AiIcons.AiFillProfile />,
        cName: 'nav-text',
    },
    {
        title: 'What is this?',
        path: '/404NotFound',
        icon: <AiIcons.AiOutlineQuestion />,
        cName: 'nav-text',
    },
]