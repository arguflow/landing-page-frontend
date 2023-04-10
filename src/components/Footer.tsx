import { RiLogosTwitterLine } from 'solid-icons/ri'
import { RiLogosYoutubeLine } from 'solid-icons/ri'
import { RiLogosTwitchLine } from 'solid-icons/ri'
import { RiLogosGithubLine } from 'solid-icons/ri'

export const Footer = () => {
  return (
    <div class="flex flex-row space-x-2 mt-16 w-full justify-center">
      <a href="https://twitter.com/arguflow">
        <RiLogosTwitterLine class="w-6 h-6 fill-cod-gray dark:fill-white" />
      </a>
      <a href="https://www.youtube.com/@arguflow">
        <RiLogosYoutubeLine class="w-6 h-6 fill-cod-gray dark:fill-white" />
      </a>
      <a href="https://www.twitch.tv/arguflow">
        <RiLogosTwitchLine class="w-6 h-6 fill-cod-gray dark:fill-white" />
      </a>
      <a href="https://github.com/arguflow">
        <RiLogosGithubLine class="w-6 h-6 fill-cod-gray dark:fill-white" />
      </a>
    </div>
  );
};
