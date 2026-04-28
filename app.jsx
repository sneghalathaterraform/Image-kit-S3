import { videos } from "./src-videos";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>🌍 Travel Bucket List</h1>

      {videos.map((video, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h3>{video.title}</h3>
          <video width="500" controls>
            <source src={video.url} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}

export default App;
