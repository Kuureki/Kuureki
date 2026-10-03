export interface UsesItem {
  name: string;
  note: string;
}

export interface UsesGroup {
  title: string;
  items: UsesItem[];
}

export const USES: UsesGroup[] = [
  {
    title: 'Editor',
    items: [
      {
        name: 'MonoCode',
        note: 'A GUI for the coding agents I already have installed. It holds no tokens of its own, it runs whatever CLIs are on the machine. Tabs are sessions, so I stopped juggling terminal windows.',
      },
      {
        name: 'GPUI',
        note: 'Zed\'s Rust UI framework. Hybrid immediate and retained mode, GPU accelerated, and it stays out of the way of the logic. I want more of my own tools written in it.',
      },
    ],
  },
  {
    title: 'Terminal',
    items: [
      {
        name: 'Warp',
        note: 'Blocks instead of a raw scrollback, so a command and its output stay together and I can rerun or share either one. It is closed source and sends usage data until you turn that off in settings, which I did on day one.',
      },
    ],
  },
  {
    title: 'Hardware',
    items: [
      {
        name: 'Lenovo Legion 5',
        note: 'Bought for thermals that survive a long compile. It stays cool and quiet under load instead of throttling, which is the whole reason I moved on from what I had before.',
      },
    ],
  },
  {
    title: 'Software',
    items: [
      {
        name: 'Helium',
        note: 'My primary browser. Chromium with the Google services compiled out, uBlock Origin shipped as a component, bang shortcuts in the omnibox, and zero network requests on first launch.',
      },
      {
        name: 'Figma',
        note: 'Sometimes. I only open it when I need to see something before I build it.',
      },
    ],
  },
];
