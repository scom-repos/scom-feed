import { Module, customModule, Container } from '@ijstech/components';
import ScomFeed from '@scom/scom-feed';

@customModule
export default class Module1 extends Module {
  private _data: any;
  private feedEl: ScomFeed;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this._data = {
      posts: [
        {
          id: 'post_3',
          publishDate: '10/02/2023 09:15:00',
          author: {
            id: 'author_3',
            username: 'PinballReed',
            description: 'Reed-Pinball is fun',
            avatar: 'https://placehold.co/50',
            pubKey: '',
          },
          stat: {
            reply: 17,
            repost: 54,
            upvote: 886,
            downvote: 0,
            view: 11000,
          },
          data: [
            {
              module: '@scom/scom-image',
              data: {
                properties: {
                  url: 'https://media2.giphy.com/media/1yMOp5EBtjDlkp5uJ9/source.gif',
                },
                tag: {
                  width: '200px',
                  pt: 0,
                  pb: 0,
                  pl: 0,
                  pr: 0,
                },
              },
            },
          ],
        },
        {
          id: 'post',
          publishDate: '10/26/2023 14:40:00',
          author: {
            id: 'author_0',
            username: 'elonmusk',
            description: `Elon Musk`,
            avatar: 'https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg',
            pubKey: '',
          },
          stat: {
            reply: 10,
            repost: 3,
            upvote: 48,
            downvote: 0,
            view: 20,
          },
          data: [
            {
              module: '@scom/scom-markdown-editor',
              data: {
                properties: {
                  content: 'New post',
                },
                tag: {
                  width: '100%',
                  pt: 0,
                  pb: 0,
                  pl: 0,
                  pr: 0,
                },
              },
            },
          ],
        }
      ],
    };
  }

  async init() {
    super.init();
    const newTag = {
      light: {},
      dark: {
        fontColor: '#fff',
        backgroundColor: '#000',
        cardBackground: '#121212',
        gradientBackground: 'linear-gradient(135deg, #FA3C3C 0%, #5B09AD 100%)',
        secondaryColor: '#666666',
        primaryColor: '#ca079f',
        primaryLightColor: '#ab268e',
        successColor: '#66e205',
        successBackground: 'rgba(0, 186, 124, 0.1)',
        errorColor: '#bc1870',
        errorBackground: 'rgba(249, 24, 128, 0.1)',
        warningColor: '#ff9f2f',
        modalBackground: '#000',
        borderColor: '#666666',
        hoverColor: '#222222',
        groupBorderColor: '#AAAAAA',
        inputBackground: '#222222',
        inputColor: '#757575'
      },
    };
    const builderTarget = this.feedEl
      .getConfigurators()
      .find((conf: any) => conf.target === 'Builders');
    if (builderTarget?.setTag) {
      await builderTarget.setTag({ ...newTag });
    }
  }

  render() {
    return (
      <i-vstack margin={{ left: 'auto', right: 'auto' }} maxWidth={960}>
        <i-scom-feed id="feedEl" data={this._data} theme="dark" />
      </i-vstack>
    );
  }
}
