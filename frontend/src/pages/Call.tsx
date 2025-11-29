import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  Call as ICall,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import useUserAuth from "../hooks/useUserAuth";
import { UserService } from "../api/service";
import { QUERY_KEYS } from "../constants/query-keys";
import { LoadingIndicator } from "stream-chat-react";
import CallContent from "../components/CallContent";

const STREAM_APP_KEY = import.meta.env.VITE_STREAM_APP_KEY;

const Call = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<ICall | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { user, isLoading } = useUserAuth();

  const { data } = useQuery({
     queryKey: [QUERY_KEYS.STREAM_CHAT_TOKEN, callId],
     queryFn: () => UserService.getStreamChatToken(),
     enabled: !!user
   });
 

  useEffect(() => {
    const initCall = async () => {
      if (!data?.data || !user || !callId) return;
      try {
        console.log("Initializing Stream video client...");

        const chatUser = {
          id: user?.data._id,
          name: user?.data.fullName,
          image: user?.data.profilePicture,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_APP_KEY,
          user: chatUser,
          token: data.data,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [user, data, callId]);

  if (isLoading || isConnecting) return <LoadingIndicator />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Call;