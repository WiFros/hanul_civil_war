'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const NavbarComponent = () => {
    return (
        <Navbar isBordered>
            <NavbarBrand>
                <p className="font-bold text-inherit">자낳대[하눌]</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">홈</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">내전 목록</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">사용 가이드</Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">로그인</Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarComponent;