import {
  FOLLOWED_ARTISTS,
  ARTIST,
  RELATED_ARTISTS,
  FOLLOW_ARTIST,
  UNFOLLOW_ARTIST,
} from "constants/ActionConstants";
import {
  FOLLOWED_ARTISTS_LIMIT,
  MESSAGES,
} from "constants/AppConstants";
import makeActionCreator from "utils/makeActionCreator";
import transformResponse from "utils/transformResponse";
import spotifyQuery from "utils/spotifyApi";
import changeNumFormat from "utils/changeNumFormat";
import alert from "components/Common/Alert/Alert";

export function loadFollowedArtists() {
  return async dispatch => {
    const pending = makeActionCreator(FOLLOWED_ARTISTS.PENDING);
    const success = makeActionCreator(FOLLOWED_ARTISTS.SUCCESS, "payload");
    const error = makeActionCreator(FOLLOWED_ARTISTS.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getFollowedArtists",
        [{limit: FOLLOWED_ARTISTS_LIMIT}]
      );
      dispatch(
        success({
          items: transformResponse.artists(response.artists.items),
          total: response.artists.total,
        })
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
        return;
      }
      dispatch(error());
    }
  };
}

export function loadMoreFollowedArtists(after = 0) {
  return async dispatch => {
    const pending = makeActionCreator(FOLLOWED_ARTISTS.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      FOLLOWED_ARTISTS.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(FOLLOWED_ARTISTS.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getFollowedArtists",
        [{limit: FOLLOWED_ARTISTS_LIMIT, after}]
      );
      dispatch(
        success({
          items: transformResponse.artists(response.artists.items),
          total: response.artists.total,
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function loadArtist(artistId) {
  return async dispatch => {
    const pending = makeActionCreator(ARTIST.PENDING);
    const success = makeActionCreator(ARTIST.SUCCESS, "payload");
    const error = makeActionCreator(ARTIST.ERROR);
    try {
      dispatch(pending());
      const artist = await spotifyQuery(
        "getArtist",
        [artistId]
      );
      const isFollower = await spotifyQuery(
        "isFollowingArtists",
        [[artistId]]
      );
      dispatch(
        success({
          ...artist,
          isFollower: isFollower[0],
          followers: `
            ${changeNumFormat(artist.followers.total)} 
            ${artist.followers.total === 1
              ? "follower"
              : "followers"
            }
          `,
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
    }
  };
}

export function loadRelatedArtists(id = "") {
  return async dispatch => {
    const pending = makeActionCreator(RELATED_ARTISTS.PENDING);
    const success = makeActionCreator(RELATED_ARTISTS.SUCCESS, "payload");
    const error = makeActionCreator(RELATED_ARTISTS.ERROR);
    try {
      dispatch(pending());
      let artistId, artistName;
      if (!id) {
        const randomArtist = await getRandomArtist();
        artistId = randomArtist.id;
        artistName = randomArtist.name;
      } else {
        artistId = id;
      }
      const relatedArtists = await spotifyQuery(
        "getArtistRelatedArtists",
        [artistId]
      );
      dispatch(
        success({
          artistName,
          items: transformResponse.artists(
            relatedArtists.artists,
            {imageIndex: 2}
          ).slice(0, 12),
        })
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
        return;
      }
      dispatch(error());
    }
  };
}

async function getRandomArtist() {
  const followedArtists = await spotifyQuery("getFollowedArtists");
  const artists = followedArtists.artists.items;
  const randomNum = Math.floor(Math.random() * artists.length);
  return {
    id: artists[randomNum].id,
    name: artists[randomNum].name,
  };
}

export function followArtist(artist) {
  return async dispatch => {
    const success = makeActionCreator(FOLLOW_ARTIST);
    try {
      await spotifyQuery("followArtists", [[artist.id]]);
      dispatch(success());
      alert.show(MESSAGES.SAVED_TO_LIBRARY);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function unfollowArtist(artistId) {
  return async dispatch => {
    const success = makeActionCreator(UNFOLLOW_ARTIST, "payload");
    try {
      await spotifyQuery("unfollowArtists", [[artistId]]);
      dispatch(success(artistId));
      alert.show(MESSAGES.REMOVED_FROM_LIBRARY);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}