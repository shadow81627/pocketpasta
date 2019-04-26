import { shallowMount } from '@vue/test-utils';
import component from '@/components/ProfileSocial';

const factory = () =>
  shallowMount(component, {
    propsData: {
      description:
        'Programmer and full stack web developer at XCOM Media, Griffith University graduate. Aspiring entrepreneur with a passion for startup weekends and hackathons.',
      keywords: 'html5, css3, jquery, bootstrap4',
      email: 'mailto:damien.robinson@pocketpasta.com',
      jobTitle: 'Full Stack Web Developer',
      brand: 'Pocket Pasta',
      name: 'Damien Robinson',
      givenName: 'Damien',
      familyName: 'Robinson',
      alumniOf: 'Griffith University',
      gender: 'male',
      nationality: 'Australian',
      url: 'https://pocketpasta.com',
      sameAs: [
        'https://github.com/shadow81627',
        'https://www.linkedin.com/in/damien-robinson-788925101/',
        'https://twitter.com/Shadow81627',
      ],
    },
  });

describe('ProfileSocial', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(component.head()).toBeTruthy();
  });
});
