use scripting additions
use framework "Foundation"

tell application "System Events"
  set isSpotifyRunning to (name of processes) contains "Spotify"
end tell

if isSpotifyRunning is true then
  tell application "Spotify"
    set { artistName, songName, albumName, songDuration } to {artist, name, album, duration} of current track
    set isPlaying to player state is playing
    set currentPosition to player position
    
    set result to { isRunning: true, isPlaying: isPlaying, artistName: artistName, songName: songName, albumName: albumName, songDuration: songDuration, currentPosition: currentPosition }
    return my toJSON(result)
  end tell
else
  set result to { isRunning: false }
  return my toJSON(result)
end if

on toJSON(x)
  set ca to current application
  set { jsonData, e } to ca's NSJSONSerialization's dataWithJSONObject:x options:1 |error|:(reference)
	
  if jsonData is missing value then
    error (e's localizedDescription() as text) number -10000
  end if
	
  -- convert data to a UTF8 string
	set jsonString to current application's NSString's alloc()'s initWithData:jsonData encoding:(current application's NSUTF8StringEncoding)
	return jsonString as text
end toJSON