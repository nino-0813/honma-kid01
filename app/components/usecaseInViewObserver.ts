/**
 * #usecase がビューポートと交差したら true（「入った瞬間」に合わせる）。
 * DesktopFloatingApplyCta / HeroSectionNav（floating row）で共通利用。
 */
export const USECASE_IN_VIEW_OBSERVER_INIT: IntersectionObserverInit = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};
