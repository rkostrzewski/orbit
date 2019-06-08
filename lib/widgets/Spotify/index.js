import { styled, css } from 'uebersicht';
import { withCommand } from '../../state'
import Widget, { getBackgroundColor, getColor } from '../../components/Widget'

const getSpotifyInfoScriptPath = 'orbit/lib/widgets/Spotify/get-spotify-info.applescript'

export default (config, theme) => {
  const { refreshFrequency } = config;
  const command = `osascript '${getSpotifyInfoScriptPath}'`

  const spotifyWidgetLayout = css`
    flex-direction: column;
  `

  const TrackName = styled('span')`
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    padding: 0 1em;
    width: 100%;
    opacity: ${p => p.isPlaying ? 1 : 0.3};
  `

  const ProgressBar = styled('div')`
    height: 0.2em;
    width: 100%;
    overflow: hidden;
    opacity: 0.8;
    background: ${getBackgroundColor(theme, 'widgets.spotify.progressBar', theme.colors.background)};
    border-radius: 4px;
    margin-top: 4px;
  `

  const Progress = styled('div')`
    height: 100%;
    background: ${getColor(theme, 'widgets.spotify.progress', theme.colors.foreground)};
    border-radius: 4px;
    transition-property: width;
    transition-duration: ${refreshFrequency}ms;
    transition-timing-function: linear;
    opacity: ${p => p.isPlaying ? 1 : 0.3};
  `

  let previousProgress = 0;
  const TrackProgress = ({ progress, isPlaying }) => {
    const transitionDuration = progress > previousProgress ? `${refreshFrequency}ms` : 0;
    previousProgress = progress;
    return (
      <ProgressBar>
        <Progress isPlaying={isPlaying} style={{ width: `${Math.round(progress * 100, 4)}%`, transitionDuration }} />
      </ProgressBar>
    )
  }

  const Spotify = ({ output }) => {
    let spotifyInfo;
    try {
      spotifyInfo = JSON.parse(output);
    } catch (e) {
      console.error(e)
      return null;
    }

    const { isRunning, isPlaying, currentPosition, songDuration, artistName, songName } = spotifyInfo;

    if (!isRunning) {
      return null;
    }

    const progress = currentPosition * 1000 / (songDuration)
    
    return (
      <Widget name="spotify" theme={theme} className={spotifyWidgetLayout}>
        <TrackName isPlaying={isPlaying}>{artistName} - {songName}</TrackName>
        <TrackProgress progress={progress} isPlaying={isPlaying} />
      </Widget>
    )
  };

  return withCommand(
    'spotify',
    { refreshFrequency, command, initialOutput: '{ "isRunning": false }' },
  )(Spotify)
}