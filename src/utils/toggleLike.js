export default function toggleLike(trackList, trackId) {
  return trackList.map(track => {
    if (track.id === trackId) {
      return {
        ...track,
        saved: !track.saved,
      };
    }
    return track;
  });
}