import {
  trigger,
  transition,
  animate,
  animation,
  style,
  keyframes,
  useAnimation,
  query,
  stagger,
  animateChild,state,group
} from '@angular/animations';

export let fromBottomToTop = animation([
  animate(
      '{{duration}} {{easing}}',
        keyframes([
          style({
            transform: 'translateY(30%)',
          }),
          style({
            opacity:0,
          })
      ])
  ),animate(
    '{{duration}} {{easing}}'
)]
);
export let fromRightToLeft = animation([
  animate(
      '{{duration}} {{easing}}',
        keyframes([
          style({
            transform: 'translateX(30%)',
          }),
          style({
            opacity:0,
          })
      ])
  ),animate(
    '{{duration}} {{easing}}'
)]
);
export let cardAnimation = trigger('cardAnimation', [
  state('hide', style({opacity:0.1})),
  state('show', style({opacity:1})),
  transition('hide => show', [
    useAnimation(fromBottomToTop, {
      params: {
        duration: '1s',
        easing: 'ease-in-out',
      },
    }),
  ])
]);
export let topContributorsCardAnimation = trigger('topContributorsCardAnimation', [
  state('hide', style({opacity:0.1})),
  state('show', style({opacity:1})),
  transition('hide => show', [
    useAnimation(fromRightToLeft, {
      params: {
        duration: '1s',
        easing: 'ease-in-out',
      },
    }),
  ])
]);
export let cardsAnimation = trigger('cardsAnimation', [
  state('hide', style({
  })),
  state('show', style({
  })),
  transition('hide => show', [
    group([
      query('@cardAnimation', stagger(150, animateChild())),
      query('@headerAnimation', stagger(150, animateChild()),{optional:true}),
    ])
  ]),
]);
export let topContributorsCardsAnimation = trigger('topContributorsCardsAnimation', [
  state('hide', style({
  })),
  state('show', style({
  })),
  transition('hide => show', [
    group([
      query('@topContributorsCardAnimation', stagger(150, animateChild())),
      query('@headerAnimation', stagger(150, animateChild()),{optional:true}),
    ])
  ]),
]);
export let fromTop = animation([
  animate(
      '{{duration}} {{easing}}',
        keyframes([
          style({
            transform: 'translateY(-60px)',
            opacity:0
          }),
          style({
            transform: 'translateY(-40px)',
            opacity:0.4
          }),
          style({
            transform: 'translateY(-20px)',
            opacity:0.6
          }),
      ])
  ),animate(
    '{{duration}} {{easing}}'
)],{
    params: {
      duration: '20ms',
      easing: 'ease-out',
    },
  }
);
export let fromLeft = animation([
  animate(
      '{{duration}} {{easing}}',
      keyframes([
        style({
          transform: 'translateX(-40%)',
        })
      ])
  )],{
    params: {
      duration: '20ms',
      easing: 'ease-out',
    },
  }
);




export let fadeInAnimation = animation(
  [style({ opacity: 0,transform:'translateX(200px)' }), animate('{{ duration }} {{ easing }}')],
  {
    params: {
      duration: '2s',
      easing: 'ease-out',
    },
  }
);

export let headerAnimation = trigger('headerAnimation', [
  state('hide', style({
  })),
  state('show', style({
  })),
  transition('hide => show', [ useAnimation(fadeInAnimation,{
    params: {
      duration: '700ms',
      easing: 'ease-in-out',
    },
  })]),
]);


export let fade = trigger('fade', [
  transition(':enter', useAnimation(fadeInAnimation)),

  transition(':leave', [animate(2000, style({ opacity: 0 }))]),
]);


export let slide = trigger('slide', [
  transition(':enter', [
    style({ transform: 'translateX(-10px)' }),
    animate(500),
  ]),

  transition(':leave', useAnimation(fromBottomToTop)),
]);