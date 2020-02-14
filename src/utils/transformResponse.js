import msToTime from "./msToTime";

const transformResponse = {
  artists: (data, {imageIndex = 0} = {}) => {
    return data.map(artist => {
      return {
        image: artist.images[imageIndex] ? artist.images[imageIndex].url : "",
        id: artist.id,
        name: artist.name,
        href: artist.href,
      };
    });
  },
  albums: data => {
    const albums = data.items ? data.items : data;
    return albums.map(album => {
      const meta = album.artists.map(artist => {
        return {
          name: artist.name,
          id: artist.id,
        };
      });
      return {
        image: album.images[0] ? album.images[0].url :"",
        id: album.id,
        name: album.name,
        meta,
      };
    });
  },
  playlists: (data, includeOwner = false) => {
    const playlists = data.items ? data.items : data;
    return playlists.map(playlist => {
      const total = playlist.tracks.total;
      const meta = total + ((total === 1) ? " track" : " tracks");
      const response = {
        image: playlist.images[0] ? playlist.images[0].url :"",
        id: playlist.id,
        name: playlist.name,
        meta,
      };
      if (includeOwner) {
        response.ownerId = playlist.owner.id;
      }
      return response;
    });
  },
  categories: data => {
    return {
      items: data.categories.items.map(category => {
        return {
          image: category.icons[0].url,
          id: category.id,
          name: category.name,
          href: category.href,
        };
      }),
      total: data.categories.total,
    };
  },
  tracks: (tracks, savedTracks) => {
    return tracks.map((item, index) => {
      const track = item.track || item;
      let trackNumber = "";
      if (track.track_number) {
        trackNumber = track.track_number < 10
          ? `0${track.track_number}`
          : track.track_number;
      }
      return {
        authors: track.artists.map(artist => {
          return {
            name: artist.name,
            id: artist.id,
          };
        }),
        image: track.images
          ? track.images[2].url
          : track.album.images[2].url,
        track_number: trackNumber,
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        duration: msToTime(track.duration_ms),
        uri: track.uri,
        saved: savedTracks[index],
      };
    });
  },
};

export default transformResponse;