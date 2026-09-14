const VideoTitle = () => {
    return (
        <div className="pt-40 px-12 absolute text-white">
            <h1 className="text-4xl font-bold">Movie Title</h1>
            <p className="w-1/3 mt-4">
                This is a description of the movie. It looks like Netflix UI.
            </p>

            <div className="mt-4">
                <button className="bg-white text-black px-6 py-2 mr-2 rounded">
                    ▶ Play
                </button>
                <button className="bg-gray-500 text-white px-6 py-2 rounded">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;