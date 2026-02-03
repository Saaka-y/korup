import Image from "next/image";
import { CiBellOn, CiMenuKebab } from "react-icons/ci";


export default function Header() {

    return (
        <header className="absolute top-0 left-0 h-20 w-full mb-2 flex justify-between items-center px-4">
            <button><CiMenuKebab size={24} /></button>
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
            <CiBellOn size={24} />
        </header>
    );
}
