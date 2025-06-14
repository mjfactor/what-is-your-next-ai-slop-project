"use client";

import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation";
export default function Home() {
    const params = useParams();
    // Disregard the id type for now, as it will be replaced with a proper ID generation mechanism later
    const projectId = params.id;
    return (
        <main>

        </main>
    );
}