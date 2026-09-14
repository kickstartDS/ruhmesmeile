import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlogAsideStoryblok {
  author?: BlogAuthorStoryblok[];
  socialSharing?: SocialSharingStoryblok[];
  readingTime?: string;
  date?: string;
  className?: string;
  type?: string;
  _uid: string;
  component: "blog-aside";
}

export interface AssetStoryblok {
  _uid?: string;
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {};
  is_external_url?: boolean;
}

export interface BlogAuthorStoryblok {
  name?: string;
  byline?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_fullWidth: boolean;
  image_aspectRatio?: "" | "wide" | "square" | "vertical";
  links?: LinksStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-author";
}

export interface BlogHeadStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline?: string;
  image?: AssetStoryblok;
  alt?: string;
  type?: string;
  _uid: string;
  component: "blog-head";
}

export interface BlogOverviewStoryblok {
  section?: SectionStoryblok[];
  latestTitle?: string;
  latest?: BlogTeaserStoryblok[];
  listTitle?: string;
  list?: BlogTeaserStoryblok[];
  moreTitle?: string;
  more?: BlogTeaserStoryblok[];
  cta?: CtaStoryblok[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-overview";
}

export interface BlogPostStoryblok {
  head?: BlogHeadStoryblok[];
  aside?: BlogAsideStoryblok[];
  content?: string;
  section?: SectionStoryblok[];
  cta?: (GlobalReferenceStoryblok | CtaStoryblok)[];
  seo?: SeoStoryblok[];
  type?: string;
  _uid: string;
  component: "blog-post";
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
    };

export interface BlogTeaserStoryblok {
  date?: string;
  tags?: TagsStoryblok[];
  headline?: string;
  teaserText?: string;
  image?: AssetStoryblok;
  alt?: string;
  link_url?: MultilinkStoryblok;
  link_text?: string;
  type?: string;
  readingTime?: string;
  author_name?: string;
  link_label?: string;
  author_title?: string;
  author_image?: AssetStoryblok;
  className?: string;
  _uid: string;
  component: "blog-teaser";
}

export interface BusinessCardStoryblok {
  centered: boolean;
  image_src?: AssetStoryblok;
  image_alt?: string;
  logo_src?: AssetStoryblok;
  logo_alt?: string;
  logo_url?: MultilinkStoryblok;
  topic?: string;
  address?: string;
  avatar_src?: AssetStoryblok;
  avatar_alt?: string;
  contactLinks?: ContactLinksStoryblok[];
  buttons?: ButtonsStoryblok[];
  _uid: string;
  component: "business-card";
}

export interface ButtonsStoryblok {
  label?: string;
  icon?: string;
  target?: MultilinkStoryblok;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "buttons";
}

export interface CategoriesStoryblok {
  label?: string;
  _uid: string;
  component: "categories";
}

export interface CategoryCheckboxesStoryblok {
  entry?: string;
  _uid: string;
  component: "categoryCheckboxes";
}

export interface ComponentTypesStoryblok {
  entry?: string;
  _uid: string;
  component: "componentTypes";
}

export interface ContactStoryblok {
  image_src?: AssetStoryblok;
  image_alt?: string;
  image_fullWidth: boolean;
  image_aspectRatio?: "" | "wide" | "square" | "vertical";
  title?: string;
  type?: string;
  subtitle?: string;
  links?: LinksStoryblok[];
  copy?: string;
  className?: string;
  component: "contact";
  _uid: string;
}

export interface ContactLinksStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "contactLinks";
}

export interface ContentNavStoryblok {
  image_src?: MultilinkStoryblok;
  image_alt?: string;
  topic?: string;
  links?: LinksStoryblok[];
  initiallyShown?: string;
  _uid: string;
  component: "content-nav";
}

export interface CtaStoryblok {
  headline?: string;
  type?: string;
  contentAlign?: "" | "center" | "top" | "bottom";
  fullWidth: boolean;
  sub?: string;
  text?: string;
  highlightText: boolean;
  colorNeutral: boolean;
  inverted: boolean;
  buttons?: ButtonsStoryblok[];
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_padding: boolean;
  image_alt?: string;
  image_align?: "" | "center" | "top" | "bottom";
  order_mobileImageLast: boolean;
  order_desktopImageLast: boolean;
  textAlign?: "" | "left" | "center";
  align?: "" | "center" | "top" | "bottom";
  padding: boolean;
  width?: string;
  _uid: string;
  component: "cta";
}

export interface DatesStoryblok {
  date?: string;
  time?: string;
  label?: string;
  url?: MultilinkStoryblok;
  newTab: boolean;
  ariaLabel?: string;
  _uid: string;
  component: "dates";
}

export interface DividerStoryblok {
  variant?: "" | "default" | "accent";
  className?: string;
  component: "divider";
  _uid: string;
}

export interface DownloadStoryblok {
  name?: string;
  description?: string;
  previewImage?: AssetStoryblok;
  url?: MultilinkStoryblok;
  size?: string;
  format?: string;
  _uid: string;
  component: "download";
}

export interface DownloadsStoryblok {
  download?: DownloadStoryblok[];
  sharepointFolder?: string;
  _uid: string;
  component: "downloads";
}

export interface EventDetailStoryblok {
  title?: string;
  categories?: CategoriesStoryblok[];
  intro?: string;
  locations?: LocationsStoryblok[];
  download?: DownloadStoryblok[];
  description?: string;
  images?: ImagesStoryblok[];
  button_label?: string;
  button_url?: MultilinkStoryblok;
  _uid: string;
  component: "event-detail";
}

export interface EventFilterStoryblok {
  datePicker_title?: string;
  "datePicker_tab-99bc5c11-6b8b-4760-b109-07a1549fa638"?: unknown;
  "datePicker_tab-f1840f91-b15f-4bf7-9703-345386df7374"?: unknown;
  datePicker_toggle: boolean;
  categories_title?: string;
  categories_categoryCheckboxes?: CategoryCheckboxesStoryblok[];
  categories_toggle: boolean;
  applyButton_label?: string;
  applyButton_onClick?: string;
  resetButton_label?: string;
  resetButton_onClick?: string;
  _uid: string;
  component: "event-filter";
}

export interface EventLatestTeaserStoryblok {
  date?: string;
  calendar_month?: string;
  calendar_day?: string;
  title?: string;
  location?: string;
  url?: MultilinkStoryblok;
  cta?: string;
  ariaLabel?: string;
  className?: string;
  _uid: string;
  component: "event-latest-teaser";
}

export interface EventListStoryblok {
  filter?: EventFilterStoryblok[];
  events?: EventListTeaserStoryblok[];
  _uid: string;
  component: "event-list";
}

export interface EventListTeaserStoryblok {
  category?: string;
  title?: string;
  text?: string;
  date?: string;
  time?: string;
  location_name?: string;
  location_address?: string;
  tags?: TagsStoryblok[];
  image_src?: AssetStoryblok;
  image_alt?: string;
  url?: MultilinkStoryblok;
  ctaText?: string;
  ariaLabel?: string;
  className?: string;
  _uid: string;
  component: "event-list-teaser";
}

export interface FaqStoryblok {
  questions?: QuestionsStoryblok[];
  type?: string;
  _uid: string;
  component: "faq";
}

export interface FeatureStoryblok {
  cta_target?: MultilinkStoryblok;
  cta_toggle: boolean;
  cta_style?: "" | "button" | "link" | "intext";
  type?: string;
  title?: string;
  text?: string;
  cta_url?: MultilinkStoryblok;
  cta_label?: string;
  _uid: string;
  component: "feature";
}

export interface FeaturesStoryblok {
  layout?: "" | "largeTiles" | "smallTiles" | "list";
  type?: string;
  style?: "" | "intext" | "stack" | "centered" | "besideLarge" | "besideSmall";
  ctas_toggle: boolean;
  ctas_style?: "" | "button" | "link" | "intext";
  feature?: FeatureStoryblok[];
  _uid: string;
  component: "features";
}

export interface FooterStoryblok {
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  logo_height?: string;
  byline?: string;
  inverted: boolean;
  navGroups?: NavGroupsStoryblok[];
  navItems?: NavItemsStoryblok[];
  type?: string;
  copyright?: string;
  legalLink_label?: string;
  legalLink_url?: MultilinkStoryblok;
  socialLinks?: SocialLinksStoryblok[];
  _uid: string;
  component: "footer";
}

export interface GalleryStoryblok {
  images?: ImagesStoryblok[];
  type?: string;
  layout?: "" | "stack" | "smallTiles" | "largeTiles" | "slider";
  aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  lightbox: boolean;
  _uid: string;
  component: "gallery";
}

export interface GlobalStoryblok {
  global?: (
    | BlogTeaserStoryblok
    | ContactStoryblok
    | CtaStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | InfoTableStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  _uid: string;
  component: "global";
  uuid?: string;
}

export interface GlobalReferenceStoryblok {
  reference?: unknown[];
  _uid: string;
  component: "global_reference";
}

export interface HeaderStoryblok {
  logo_src?: AssetStoryblok;
  logo_srcInverted?: AssetStoryblok;
  logo_alt?: string;
  logo_homepageHref?: MultilinkStoryblok;
  logo_width?: string;
  type?: string;
  logo_height?: string;
  flyoutInverted: boolean;
  dropdownInverted: boolean;
  floating: boolean;
  inverted: boolean;
  navItems?: NavItemsStoryblok[];
  _uid: string;
  component: "header";
}

export interface HeadlineStoryblok {
  text?: string;
  sub?: string;
  switchOrder: boolean;
  align?: "" | "left" | "center" | "right";
  level?: "" | "h1" | "h2" | "h3" | "h4" | "p";
  style?: "" | "h1" | "h2" | "h3" | "h4" | "p";
  spaceAfter?: "" | "minimum" | "small" | "large";
  className?: string;
  id?: string;
  _uid: string;
  component: "headline";
}

export interface HeroStoryblok {
  headline?: string;
  type?: string;
  sub?: string;
  text?: string;
  highlightText: boolean;
  colorNeutral: boolean;
  height?: "" | "small" | "default" | "fullImage" | "fullScreen";
  textbox: boolean;
  mobileTextBelow: boolean;
  invertText: boolean;
  buttons?: ButtonsStoryblok[];
  skipButton: boolean;
  overlay: boolean;
  image_srcMobile?: AssetStoryblok;
  image_srcTablet?: AssetStoryblok;
  image_srcDesktop?: AssetStoryblok;
  image_src?: AssetStoryblok;
  image_indent?: "" | "none" | "left" | "right";
  image_alt?: string;
  textPosition?: "" | "center" | "below" | "offset" | "left" | "right" | "corner" | "bottom";
  _uid: string;
  component: "hero";
}

export interface HtmlStoryblok {
  html?: string;
  consent: boolean;
  consentText?: string;
  consentButtonLabel?: string;
  consentBackgroundImage?: AssetStoryblok;
  consentAspectRatio?: "" | "VALUE_16_9" | "VALUE_16_10" | "VALUE_4_3" | "VALUE_1_1";
  inverted: boolean;
  type?: string;
  className?: string;
  component: "html";
  _uid: string;
}

export interface ImagesStoryblok {
  src?: AssetStoryblok;
  alt?: string;
  caption?: string;
  _uid: string;
  component: "images";
}

export interface ImageStoryStoryblok {
  headline?: string;
  largeHeadline: boolean;
  sub?: string;
  text?: string;
  layout?: "" | "textLeft" | "imageLeft";
  padding: boolean;
  buttons?: ButtonsStoryblok[];
  image_src?: AssetStoryblok;
  image_aspectRatio?: "" | "unset" | "square" | "wide" | "landscape";
  type?: string;
  image_alt?: string;
  image_vAlign?: "" | "center" | "top" | "bottom";
  textAlign?: "" | "left" | "center";
  _uid: string;
  component: "image-story";
}

export interface ImageTextStoryblok {
  text?: string;
  type?: string;
  highlightText: boolean;
  image_src?: AssetStoryblok;
  image_alt?: string;
  layout?: "" | "above" | "below" | "beside_right" | "beside_left";
  _uid: string;
  component: "image-text";
}

export interface TableStoryblok {
  thead: {
    _uid: string;
    value?: string;
    component: number;
  }[];
  tbody: {
    _uid: string;
    body: {
      _uid?: string;
      value?: string;
      component?: number;
    }[];
    component: number;
  }[];
}

export interface InfoTableStoryblok {
  data?: TableStoryblok;
  type?: string;
  _uid: string;
  component: "info-table";
}

export interface ItemsStoryblok {
  url?: MultilinkStoryblok;
  label?: string;
  active: boolean;
  _uid: string;
  component: "items";
}

export interface LinksStoryblok {
  label?: string;
  url?: MultilinkStoryblok;
  href?: MultilinkStoryblok;
  newTab: boolean;
  ariaLabel?: string;
  type?: string;
  _uid: string;
  component: "links";
}

export interface LocationsStoryblok {
  dates?: DatesStoryblok[];
  locationName?: string;
  displayMode?: "" | "spacious" | "compact";
  address?: string;
  links?: LinksStoryblok[];
  _uid: string;
  component: "locations";
}

export interface LogoStoryblok {
  src?: AssetStoryblok;
  type?: string;
  alt?: string;
  _uid: string;
  component: "logo";
}

export interface LogosStoryblok {
  tagline?: string;
  type?: string;
  logo?: LogoStoryblok[];
  align?: "" | "left" | "center";
  logosPerRow?: string;
  cta_toggle: boolean;
  cta_text?: string;
  cta_link?: MultilinkStoryblok;
  cta_label?: string;
  cta_style?: "" | "button" | "text";
  _uid: string;
  component: "logos";
}

export interface MatchesStoryblok {
  title?: string;
  snippet?: string;
  url?: string;
  _uid: string;
  component: "matches";
}

export interface MosaicStoryblok {
  layout?: "" | "alternate" | "textLeft" | "textRight";
  tiles?: TilesStoryblok[];
  type?: string;
  largeHeadlines: boolean;
  tile?: TileStoryblok[];
  _uid: string;
  component: "mosaic";
}

export interface NavGroupsStoryblok {
  heading?: string;
  items?: ItemsStoryblok[];
  _uid: string;
  component: "navGroups";
}

export interface NavItemsStoryblok {
  url?: MultilinkStoryblok;
  href?: MultilinkStoryblok;
  label?: string;
  active: boolean;
  items?: (NavSubItemsStoryblok | ItemsStoryblok)[];
  _uid: string;
  component: "navItems";
}

export interface NavSubItemsStoryblok {
  href?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  label?: string;
  _uid: string;
  component: "navSubItems";
}

export interface PageStoryblok {
  section?: (SectionStoryblok | PrompterStoryblok)[];
  type?: string;
  header_floating: boolean;
  header_inverted: boolean;
  header_logo?: AssetStoryblok;
  footer_inverted: boolean;
  footer_logo?: AssetStoryblok;
  token?: string;
  hidePageBreadcrumbs: boolean;
  seo?: SeoStoryblok[];
  theme?: string;
  hideBookDemoButton: boolean;
  _uid: string;
  component: "page";
  uuid?: string;
}

export interface PrompterStoryblok {
  mode?: "" | "section" | "page";
  componentTypes?: ComponentTypesStoryblok[];
  sections?: string;
  includeStory: boolean;
  useIdea: boolean;
  relatedStories?: RelatedStoriesStoryblok[];
  userPrompt?: string;
  type?: string;
  systemPrompt?: string;
  contentType?: "" | "page" | "blog_post" | "blog_overview";
  startsWith?: string;
  uploadAssets: boolean;
  _uid: string;
  component: "prompter";
}

export interface QuestionsStoryblok {
  question?: string;
  answer?: string;
  _uid: string;
  component: "questions";
}

export interface RelatedStoriesStoryblok {
  entry?: string;
  _uid: string;
  component: "relatedStories";
}

export interface SearchStoryblok {
  headline?: HeadlineStoryblok[];
  searchBar?: SearchBarStoryblok[];
  searchFilter?: SearchFilterStoryblok[];
  searchResults?: SearchResultsStoryblok[];
  _uid: string;
  component: "search";
}

export interface SearchBarStoryblok {
  placeholder?: string;
  buttonText?: string;
  hint?: string;
  alternativeText?: string;
  alternativeResult?: string;
  _uid: string;
  component: "search-bar";
}

export interface SearchFilterStoryblok {
  title?: string;
  categories?: CategoriesStoryblok[];
  _uid: string;
  component: "search-filter";
}

export interface SearchResultsStoryblok {
  url?: string;
  title?: string;
  imageColSize?: "" | "none" | "small" | "large";
  previewImage?: string;
  initialMatch?: string;
  matches?: MatchesStoryblok[];
  showLink: boolean;
  _uid: string;
  component: "searchResults";
}

export interface SectionStoryblok {
  width?: "" | "full" | "max" | "wide" | "default" | "narrow";
  style?: "" | "default" | "framed" | "deko";
  backgroundColor?: "" | "default" | "accent" | "bold";
  transition?: "" | "none" | "to_default" | "to_accent" | "to_bold" | "to_inverted";
  backgroundImage?: AssetStoryblok;
  spotlight: boolean;
  spaceBefore?: "" | "default" | "small" | "none";
  spaceAfter?: "" | "default" | "small" | "none";
  inverted: boolean;
  headerSpacing: boolean;
  headline_text?: string;
  type?: string;
  headline_large: boolean;
  headline_width?: "" | "unset" | "narrow" | "default" | "wide";
  headline_textAlign?: "" | "left" | "center" | "right";
  headline_align?: "" | "left" | "center" | "right";
  headline_sub?: string;
  headline_switchOrder: boolean;
  content_width?: "" | "unset" | "narrow" | "default" | "wide";
  content_align?: "" | "left" | "center" | "right";
  content_gutter?: "" | "large" | "default" | "small" | "none";
  content_mode?: "" | "default" | "tile" | "list" | "slider";
  content_tileWidth?: "" | "smallest" | "default" | "medium" | "large" | "largest" | "full";
  components?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | Tab463De4FbC9E74B6095B886D29A8Ac13BStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | SplitEvenStoryblok
    | SplitWeightedStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
    | InfoTableStoryblok
    | PrompterStoryblok
  )[];
  buttons?: ButtonsStoryblok[];
  aiDraft: boolean;
  anchorId?: string;
  _uid: string;
  component: "section";
}

export interface SeoStoryblok {
  title?: string;
  type?: string;
  description?: string;
  keywords?: string;
  image?: AssetStoryblok;
  cardImage?: AssetStoryblok;
  _uid: string;
  component: "seo";
}

export interface SettingsStoryblok {
  header?: HeaderStoryblok[];
  type?: string;
  footer?: FooterStoryblok[];
  seo?: SeoStoryblok[];
  iconSprite?: string;
  token?: string;
  hideBreadcrumbs: boolean;
  theme?: string;
  headerButton_enabled: boolean;
  headerButton_label?: string;
  headerButton_url?: MultilinkStoryblok;
  bookDemoButton_enabled: boolean;
  bookDemoButton_label?: string;
  bookDemoButton_url?: MultilinkStoryblok;
  bookDemoButton_variant?: "" | "primary" | "secondary" | "tertiary";
  _uid: string;
  component: "settings";
}

export interface SliderStoryblok {
  autoplay: boolean;
  nav: boolean;
  teaseNeighbours: boolean;
  equalHeight: boolean;
  gap?: string;
  arrows: boolean;
  variant?: "" | "slider" | "carousel";
  className?: string;
  type?: string;
  components?: (
    | CtaStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeroStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
  )[];
  typeProp?: "" | "slider" | "carousel";
  _uid: string;
  component: "slider";
}

export interface SocialLinksStoryblok {
  icon?: string;
  url?: MultilinkStoryblok;
  ariaLabel?: string;
  _uid: string;
  component: "socialLinks";
}

export interface SocialSharingStoryblok {
  href?: MultilinkStoryblok;
  url?: MultilinkStoryblok;
  title?: string;
  _uid: string;
  component: "socialSharing";
}

export interface SplitEvenStoryblok {
  contentMinWidth?: "" | "narrow" | "medium" | "wide";
  contentGutter?: "" | "small" | "default" | "large" | "none";
  mobileReverse: boolean;
  verticalAlign?: "" | "top" | "center" | "bottom" | "sticky";
  verticalGutter?: "" | "large" | "default" | "small" | "none";
  horizontalGutter?: "" | "large" | "default" | "small" | "none";
  firstLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  firstLayout_gutter?: "" | "none" | "small" | "default" | "large";
  firstLayout_stretchVertically: boolean;
  secondLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  secondLayout_stretchVertically: boolean;
  secondLayout_gutter?: "" | "none" | "small" | "default" | "large";
  firstComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | Tab7B4F2697F72D46249Df7B3Add8B84Bd7Storyblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  secondComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | Tab7A312335B8Be4045B414D1341A1Ace97Storyblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  _uid: string;
  component: "split-even";
}

export interface SplitWeightedStoryblok {
  verticalGutter?: "" | "large" | "default" | "small" | "none";
  horizontalGutter?: "" | "large" | "default" | "small" | "none";
  verticalAlign?: "" | "top" | "center" | "bottom" | "sticky";
  mainLayout_gutter?: "" | "large" | "default" | "small" | "none";
  mainLayout_minWidth?: "" | "narrow" | "default" | "wide";
  mainLayout_stretchVertically: boolean;
  mainLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  asideLayout_gutter?: "" | "large" | "default" | "small" | "none";
  asideLayout_minWidth?: "" | "narrow" | "default" | "wide";
  asideLayout_stretchVertically: boolean;
  asideLayout_layout?: "" | "smallTiles" | "largeTiles" | "list";
  order_mobile?: "" | "mainFirst" | "asideFirst";
  order_desktop?: "" | "mainFirst" | "asideFirst";
  mainComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | Tab1F7Ebb1C4D164B7FA03ECcd5E18F22CcStoryblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  asideComponents?: (
    | BlogTeaserStoryblok
    | BusinessCardStoryblok
    | Tab7011Ebc12A1045C7963CCe7606Bd05E1Storyblok
    | ContactStoryblok
    | ContentNavStoryblok
    | CtaStoryblok
    | DividerStoryblok
    | DownloadsStoryblok
    | EventLatestTeaserStoryblok
    | EventListTeaserStoryblok
    | FaqStoryblok
    | FeaturesStoryblok
    | GalleryStoryblok
    | HeadlineStoryblok
    | HeroStoryblok
    | HtmlStoryblok
    | ImageStoryStoryblok
    | ImageTextStoryblok
    | LogosStoryblok
    | MosaicStoryblok
    | SliderStoryblok
    | StatsStoryblok
    | TeaserCardStoryblok
    | TestimonialsStoryblok
    | TextStoryblok
    | VideoCurtainStoryblok
  )[];
  _uid: string;
  component: "split-weighted";
}

export interface StatStoryblok {
  number?: string;
  type?: string;
  description?: string;
  title?: string;
  _uid: string;
  component: "stat";
}

export interface StatsStoryblok {
  align?: "" | "left" | "center";
  type?: string;
  stat?: StatStoryblok[];
  _uid: string;
  component: "stats";
}

export interface Tab065B80E8Dbf44278A8D3Bfe6B07B0EbcStoryblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-065b80e8-dbf4-4278-a8d3-bfe6b07b0ebc";
}

export interface Tab0C4B601151Dd4642Bf5E4B997B5D2Ab9Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-0c4b6011-51dd-4642-bf5e-4b997b5d2ab9";
}

export interface Tab1F7Ebb1C4D164B7FA03ECcd5E18F22CcStoryblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-1f7ebb1c-4d16-4b7f-a03e-ccd5e18f22cc";
}

export interface Tab292583Ab59C44C76957EEa1149A2F570Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-292583ab-59c4-4c76-957e-ea1149a2f570";
}

export interface Tab2C46C3D82F994A78B8605E684A639433Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-2c46c3d8-2f99-4a78-b860-5e684a639433";
}

export interface Tab3619Db3783Ae40D0A7E845Fee02Aa507Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-3619db37-83ae-40d0-a7e8-45fee02aa507";
}

export interface Tab463De4FbC9E74B6095B886D29A8Ac13BStoryblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-463de4fb-c9e7-4b60-95b8-86d29a8ac13b";
}

export interface Tab512D76B474114C23A8790Cad8208A4D2Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-512d76b4-7411-4c23-a879-0cad8208a4d2";
}

export interface Tab7011Ebc12A1045C7963CCe7606Bd05E1Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-7011ebc1-2a10-45c7-963c-ce7606bd05e1";
}

export interface Tab7A312335B8Be4045B414D1341A1Ace97Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-7a312335-b8be-4045-b414-d1341a1ace97";
}

export interface Tab7B4F2697F72D46249Df7B3Add8B84Bd7Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-7b4f2697-f72d-4624-9df7-b3add8b84bd7";
}

export interface Tab7D1B656136224B6797E8B521081Cde27Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-7d1b6561-3622-4b67-97e8-b521081cde27";
}

export interface Tab7D8824C41F1A4103B0Dd1499Ec9405D4Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-7d8824c4-1f1a-4103-b0dd-1499ec9405d4";
}

export interface Tab8Ea3F57326E54A6F9748C32867664Aa1Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-8ea3f573-26e5-4a6f-9748-c32867664aa1";
}

export interface Tab9770Ef5B68A740Aa9DdcBd993B4D20B1Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-9770ef5b-68a7-40aa-9ddc-bd993b4d20b1";
}

export interface TabAdfa72AaA5504A30A5D766Facbc4016DStoryblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-adfa72aa-a550-4a30-a5d7-66facbc4016d";
}

export interface TabC449062FF0254B36B47DFc032Dfb4824Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-c449062f-f025-4b36-b47d-fc032dfb4824";
}

export interface TabCe0Dbebe68724C5688EcB8Dcdd4D4Ab6Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-ce0dbebe-6872-4c56-88ec-b8dcdd4d4ab6";
}

export interface TabEb6Cb55C25C94F71B19FBc7635861D5CStoryblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-eb6cb55c-25c9-4f71-b19f-bc7635861d5c";
}

export interface TabFe3D78De057A4D5B93B0C41347B16E58Storyblok {
  button_label?: string;
  button_url?: MultilinkStoryblok;
  button_variant?: "" | "primary" | "secondary" | "tertiary";
  button_size?: "" | "small" | "medium" | "large";
  button_disabled: boolean;
  button_type?: "" | "button" | "submit" | "reset";
  _uid: string;
  component: "tab-fe3d78de-057a-4d5b-93b0-c41347b16e58";
}

export interface TagsStoryblok {
  entry?: string;
  _uid: string;
  component: "tags";
}

export interface TeaserCardStoryblok {
  headline?: string;
  type?: string;
  target?: MultilinkStoryblok;
  text?: string;
  label?: string;
  layout?: "" | "stack" | "row" | "compact";
  centered: boolean;
  url?: MultilinkStoryblok;
  button_label?: string;
  button_chevron: boolean;
  button_hidden: boolean;
  image?: AssetStoryblok;
  imageAlt?: string;
  imageRatio?: "" | "wide" | "landscape" | "square" | "unset";
  expert?: unknown;
  imageHoverEffect: boolean;
  _uid: string;
  component: "teaser-card";
}

export interface TestimonialStoryblok {
  quote?: string;
  type?: string;
  name?: string;
  title?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  rating?: string;
  _uid: string;
  component: "testimonial";
}

export interface TestimonialsStoryblok {
  layout?: "" | "slider" | "list" | "alternating";
  quoteSigns?: "" | "normal" | "large" | "none";
  testimonial?: TestimonialStoryblok[];
  type?: string;
  _uid: string;
  component: "testimonials";
}

export interface TextStoryblok {
  text?: string;
  type?: string;
  layout?: "" | "singleColumn" | "multiColumn";
  align?: "" | "left" | "center";
  highlightText: boolean;
  _uid: string;
  component: "text";
}

export interface TileStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  button_toggle: boolean;
  button_label?: string;
  button_url?: MultilinkStoryblok;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  textColor?: string;
  _uid: string;
  component: "tile";
}

export interface TilesStoryblok {
  headline?: string;
  sub?: string;
  text?: string;
  image_src?: AssetStoryblok;
  image_alt?: string;
  button_toggle: boolean;
  button_label?: string;
  button_target?: MultilinkStoryblok;
  button_icon?: string;
  backgroundColor?: string;
  backgroundImage?: AssetStoryblok;
  textColor?: string;
  _uid: string;
  component: "tiles";
}

export interface TokenThemeStoryblok {
  name: string;
  tokens?: string;
  css?: string;
  system: boolean;
  _uid: string;
  component: "token-theme";
}

export interface VideoCurtainStoryblok {
  headline?: string;
  type?: string;
  sub?: string;
  text?: string;
  highlightText: boolean;
  colorNeutral: boolean;
  buttons?: ButtonsStoryblok[];
  overlay: boolean;
  video_srcMobile?: AssetStoryblok;
  video_srcTablet?: AssetStoryblok;
  video_srcDesktop?: AssetStoryblok;
  textPosition?: "" | "center" | "bottom" | "left" | "right" | "corner";
  _uid: string;
  component: "video-curtain";
}
