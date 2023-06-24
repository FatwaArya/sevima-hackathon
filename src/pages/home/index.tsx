import { Chat } from "@/components/chat/chat";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Command } from "lucide-react";


const Home = () => {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <div className="relative z-20 flex items-center text-lg font-medium">
                            <Command className="mr-2 h-6 w-6" /> Sage Inc
                        </div>
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            {/* <Search /> */}
                            <UserNav />
                        </div>
                    </div>
                </div>
                <Chat id="1" />
            </div>
        </>
    );
}

export default Home;