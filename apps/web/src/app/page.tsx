import Image from 'next/image';
import GithubLogo from '@/../public/github-mark.svg';
import CameraCloseup from '@/../public/camera-closeup.jpeg';
import ClipFusionLogo from '@/components/clipfusion-logo/clipfusion-logo';
import RoundedButton from '@/components/rounded-button/rounded-button';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faArrowRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';
import BubblyContainer from '@/components/bubbly-container/bubbly-container';

export default function Page() {
  return (
    <div className="overflow-hidden text-neutral-50 overscroll-none">
      <Image src={CameraCloseup} className="overscroll-none absolute bottom-0 left-0 saturate-0 brightness-50 dark:brightness-25 duration-75 -z-50 size-full object-cover" alt="Camera closeup picture"/>
      <main className="flex flex-col justify-center items-center text-center h-screen animate-slide-in">
        <div className="text-center">
          <div className="flex flex-row justify-center items-center">
            <ClipFusionLogo href="/home" width="50" height="50">
              <p className="font-bold text-5xl md:text-6xl lg:text-7xl my-2">ClipFusion</p>
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
      <div className="absolute bottom-0 left-0 py-5 dark">
        <div className="flex flex-row justify-between items-center w-screen px-5 md:px-3 sm:px-2">
          <a href="https://github.com/ClipFusion-editor/clipfusion" target="_blank" className="shrink-0">
            <BubblyContainer forceDark>
              <Image className="dark:invert hover:brightness-150 active:brightness-200" src={GithubLogo} alt="GitHub logo" width="40" height="40"/>  
            </BubblyContainer>  
          </a>
          <div className="text-center font-extralight text-neutral-300 lg:text-xl">
            <FontAwesomeIcon icon={faTriangleExclamation}/> ClipFusion is in active development and may be unstable!
          </div>
          <ThemeSwitcher width="40" height="40" forceDark/>
        </div>
      </div>
    </div>
  );
}
