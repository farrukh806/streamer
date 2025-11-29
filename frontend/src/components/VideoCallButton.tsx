import { VideoIcon } from 'lucide-react';


const VideoCallButton = ({ handleVideoCall }: { handleVideoCall: () => void }) => {
    return (
        <div className="p-3 border-b flex items-center justify-end mx-auto w-full absolute top-0">
            <button
                onClick={handleVideoCall}
                className="btn btn-success btn-sm text-white"
            >
                <VideoIcon className="size-6" />
            </button>
        </div>
    );
};

export default VideoCallButton;