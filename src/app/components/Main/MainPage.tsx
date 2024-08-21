import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import NavbarComponent from '@components/Main/Navbar';
import Header from '@components/Main/Header';
import Footer from '@components/Main/Footer';
import ClientWrapper from '@components/Main/ClientWrapper';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
            <NavbarComponent />
            <main className="container mx-auto px-4 py-12">
                <Header />
                <div className="max-w-md mx-auto w-full sm:w-3/4 md:w-1/2 lg:w-2/5">
                    <Card className="bg-white shadow-lg rounded-xl">
                        <CardBody>
                            <ClientWrapper />
                        </CardBody>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}