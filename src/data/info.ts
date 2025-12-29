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

export default {
  ...basic,
  ...titleCards,
  ...blogCard,
  ...socialCards,
  sectionTitles,
  ...projectCards,
  diaryCards,
  musicCards,
  teleCards: contactCards,
  cardVisibility,
};
