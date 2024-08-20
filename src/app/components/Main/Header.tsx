'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-6xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-sans">
                자낳대[하눌]
            </h1>
            <h2 className="text-2xl text-center mb-12 text-gray-600 font-light">
                내전을 더 재미있게 즐기는 새로운 방법
            </h2>
        </motion.div>
    );
};

export default Header;