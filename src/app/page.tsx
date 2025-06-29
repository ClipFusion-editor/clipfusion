import Image from 'next/image';
import GithubLogo from '@/../public/github-mark.svg';
import CameraCloseup from '@/../public/camera-closeup.jpeg';
import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import RoundedButton from '@/components/rounded-button/rounded-button';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faArrowRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
  return (
    <div className="overflow-hidden">
      <Image src={CameraCloseup} className="absolute bottom-0 left-0 saturate-0 brightness-25 -z-50 size-full object-cover" alt="Camera closeup picture"/>
      <main className="flex flex-col justify-center items-center text-center h-screen animate-slide-in">
        <div className="text-center">
          <div className="flex flex-row justify-center items-center">
            <ClipFusionLogo href="/home" width="50" height="50">
              <p className="font-bold text-6xl my-2">ClipFusion</p>
            </ClipFusionLogo>
          </div>
          <p className="font-light">Powerful alternative to Adobe Premiere Pro.</p>
          <p className="font-light">Right in your browser. Open-source.</p>
        </div>
        <div className="my-2">
          <RoundedButton href="/home">
            Start editing 
            <FontAwesomeIcon icon={faArrowRight} className="fa-fw mx-1"/>
          </RoundedButton>
        </div>
      </main>
      <div className="absolute bottom-0 left-0 py-5">
        <div className="flex flex-row justify-between items-center w-screen px-5">
          <a href="https://github.com/ClipFusion-editor/clipfusion" target="_blank">
            <Image className="dark:invert hover:brightness-150 active:brightness-200 rounded-full hover:outline-2 outline-neutral-800 outline-offset-2" src={GithubLogo} alt="GitHub logo" width="40" height="39"/>
          </a>
          <div className="text-center font-extralight text-neutral-800 dark:invert ">
            <FontAwesomeIcon icon={faTriangleExclamation}/> ClipFusion is in active development and may be unstable!
          </div>
          <p/>
        </div>
      </div>
    </div>
  );
}
