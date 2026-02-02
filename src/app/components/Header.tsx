
import { CiBellOn, CiMenuKebab } from "react-icons/ci";


export default function Header() {

    return (
        <header className="absolute top-0 left-0 flex justify-between items-center px-4 shadow-lg h-20 w-full mb-2">
            <button><CiMenuKebab size={24} /></button>
            <h1 className="text-[#9B9898] letter-spacing-0.1rem">KORUP</h1>
            <CiBellOn size={24} />
        </header>

    );
}
