import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { QUERY_KEYS } from '../constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../api/service';
import { type Channel, StreamChat } from "stream-chat"
import useUserAuth from '../hooks/useUserAuth';
import { handleError } from '../lib/utils';
import LoadingSpinner from '../components/LoadingSpinner';
import { Chat as ChatProvider, Channel as ChannelProvider, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';

const STREAM_APP_KEY = import.meta.env.VITE_STREAM_APP_KEY;

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.STREAM_CHAT_TOKEN, id],
    queryFn: () => UserService.getStreamChatToken(),
  });

  const initChat = useCallback(async () => {
    if (!data?.data || !user?.data || !id) return;
    setLoading(true);
    try {
      const client = StreamChat.getInstance(STREAM_APP_KEY);
      await client.connectUser({
        id: user.data._id,
        name: user.data.fullName,
        image: user.data.profilePicture,
      }, data.data);
      const channelId = [user.data._id, id].sort().join('_');
      const currentChannel = client.channel('messaging', channelId, {
        members: [user.data._id, id],
      });
      await currentChannel.watch();
      setChatClient(client);
      setChannel(currentChannel);
    } catch (error) {
      console.error('Error initializing chat:', error);
      handleError(error)
    } finally {
      setLoading(false);
    }
  }, [data, user, id]);

  useEffect(() => {
    if (!id) navigate("/");
    initChat();
  }, [initChat, id, navigate]);


  if (isLoading || loading || !chatClient || !channel) return <LoadingSpinner />;
  return <div className='h-[93vh] overflow-hidden p-0'>
    <ChatProvider client={chatClient} theme='str-chat__theme-dark'>
      <ChannelProvider channel={channel}>
        {/* Chat UI components go here */}
        <div className='w-full relative'>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
        </div>
      </ChannelProvider>
    </ChatProvider>
  </div>;
};

export default Chat;