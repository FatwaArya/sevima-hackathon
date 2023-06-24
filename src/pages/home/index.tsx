import { Chat } from "@/components/chat/chat";


const Home = () => {
    return (
        <>
            <Chat id="1" initialMessages={
                [
                    {
                        "id": "1",
                        "content": "Hello",
                        "role": "user"
                    },
                ]
            } />
        </>
    );
}

export default Home;