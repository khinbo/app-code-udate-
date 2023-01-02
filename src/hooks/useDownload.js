import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import helpers from '../constants/helpers';
import localStorage from '../server/localStorage';
import {
  setFilePath,
  setIsDownloded,
  setProgress,
} from '../store/reducers/player';
import toast from '../toast';

export default function useDownload() {
  const dispatch = useDispatch();
  const {progress, filePath, isDownloaded} = useSelector(state => state.player);
  const task = useRef(null);

  const isPathExist = fileName => {
    let dirs = RNFetchBlob.fs.dirs;
    const path = dirs.DocumentDir + `/${fileName}`;
    localStorage.getDownload().then(resp => {
      let data = JSON.parse(resp);
      const parsedData = data ?? [];
      if (
        parsedData.find(i => i.path === fileName && i.status === 'complete')
      ) {
        RNFetchBlob.fs
          .exists(path)
          .then(exist => dispatch(setIsDownloded(exist)));
      } else {
        dispatch(setIsDownloded(false));
      }
    });
  };

  const addToTask = async video => {
    if (isDownloaded) return toast.show('already downloaded');
    let dirs = RNFetchBlob.fs.dirs;
    if (task.current) {
      cancelDownload();
    }
    const videoUrl = helpers.getVideo(video?.path);
    const path = dirs.DocumentDir + `/${video?.path}`;
    task.current = RNFetchBlob.config({
      path: path,
      fileCache: true,
    }).fetch('GET', `${videoUrl}`, {});
    dispatch(setFilePath(video?.path));

    localStorage.getDownload().then(resp => {
      const payload = {
        ...video,
        downloadPath: path,
        status: 'pending',
        date: Date.now(),
      };

      const data = JSON.parse(resp) ?? [];
      data.push(payload);
      const payloadString = JSON.stringify(data);
      localStorage.saveDownload(payloadString).then(() => {
        downloadVideo();
      });
    });
  };

  const downloadVideo = () => {
    if (!task.current) return;
    task.current
      .progress((received, total) => {
        let progress = (received / total) * 100;
        dispatch(setProgress(parseInt(progress)));
      })
      .then(res => {
        localStorage.getDownload().then(resp => {
          let data = JSON.parse(resp);
          data.map((item, i) =>
            item.downloadPath === res.path()
              ? (data[i].status = 'complete')
              : null,
          );
          localStorage.saveDownload(JSON.stringify(data));
          dispatch(setFilePath(null));
          dispatch(setProgress(0));
        });
      })
      .catch(() => {
        toast.show('download canceled');
      });
  };

  const cancelDownload = () => {
    if (!task.current) return;
    let dirs = RNFetchBlob.fs.dirs;
    const path = dirs.DocumentDir + `/${filePath}`;
    console.log(task.current);
    RNFetchBlob.fs
      .unlink(path)
      .then(() => {
        task.current.cancel();
        dispatch(setFilePath(null));
        dispatch(setProgress(0));

        task.current = null;
      })
      .catch(err => console.log(err));
  };

  return {
    addToTask,
    downloadVideo,
    cancelDownload,
    isPathExist,
    isDownloaded,
    progress,
    filePath,
  };
}
