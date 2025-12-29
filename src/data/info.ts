import type { SiteConfig } from './types';
import basic from './modules/basic';
import titleCards from './modules/titleCards';
import blogCard from './modules/blogCard';
import socialCards from './modules/socialCards';
import sectionTitles from './modules/sectionTitles';
import projectCards from './modules/projectCards';
import diaryCards from './modules/diaryCards';
import musicCards from './modules/musicCards';
import contactCards from './modules/contactCards';
import cardVisibility from './modules/cardVisibility';

const siteConfig: SiteConfig = {
  title: basic.title,
  desc: basic.desc,
  imgUrl: basic.imgUrl,
  location: basic.location,
  lastUpdate: basic.lastUpdate,
  titleCard: titleCards.titleCard,
  blogCard: blogCard.blogCard,
  primaryCards: socialCards.primaryCards,
  sectionTitles,
  projectCardStart: projectCards.projectCardStart,
  projectCards: projectCards.projectCards,
  projectCardEnd: projectCards.projectCardEnd,
  diaryCards,
  musicCards,
  teleCards: contactCards,
  cardVisibility,
};

export default siteConfig;
