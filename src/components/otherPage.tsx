"use client";

import * as React from "react";
import { useRouter } from 'next/navigation'


export default function OtherPage() {
    const router = useRouter()

    return (
        <div>
            <button type="button" onClick={() => router.push('/')}>
                Home
            </button>
        </div>
    );
}
