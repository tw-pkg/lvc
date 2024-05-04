import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 15px;
  padding: 20px;
  border-radius: 10px;

  background-color: #313338;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.3);
`;

export const AverageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  #info-category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4.5px 0;
    width: 100%;

    p {
      font-size: 16px;
      font-weight: 600;
    }
    #name {
      color: #7f8189;
    }
    #value {
      color: #f2f3f5;
    }
    #most-champ-list {
      display: flex;
      gap: 10px;

      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
`;

export const WinningPercentage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 45px;

  #winning-percentage-text {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 16px;
      font-weight: 600;
      color: #7f8189;
    }
    #value {
      color: #e05262;
    }
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  margin-top: 10px;

  progress {
    appearance: none;

    width: 100%;
    height: 22px;

    &::-webkit-progress-bar {
      border-radius: 2px;
      background-color: #e05262;
    }
    &::-webkit-progress-value {
      border-radius: 2px 0 0 2px;
      background-color: #698de7;
    }
  }

  p {
    position: absolute;
    top: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #f2f3f5;
  }
  #win {
    left: 8px;
  }
  #fail {
    right: 8px;
  }
`;

export const RecentlyPlayList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin-top: 45px;

  #category-tag {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 14px;

    p {
      font-size: 16px;
      font-weight: 600;
      color: #7f8189;
    }
  }

  #game-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 5px;

    #kda-info {
      display: flex;
      align-items: center;

      img {
        width: 25px;
        height: 25px;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 25px;
        font-size: 14px;
        font-weight: 600;
        color: #f2f3f5;
      }
    }

    #kill-involvement {
      font-size: 16px;
      font-weight: 600;
      color: #f2f3f5;
    }
  }

  #none-game-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 27%;
      height: auto;
      margin: 17px;
    }
    p {
      font-size: 16.5px;
    }
  }
`;
