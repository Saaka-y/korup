
import { CiBellOn } from "react-icons/ci";


export default function Header() {

    return (
        <header className="absolute top-0 left-0 flex justify-between items-center px-4 shadow-lg h-20 w-full mb-2">
            <button className="text-xs">{"<<"} Learn more</button>
            <CiBellOn size={24} />
        </header>

    );
}
