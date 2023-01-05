/* eslint-disable prettier/prettier */

// type AllComponents={fontSize;fontFamily;fontWeight;lineHeight;textAlign?:"left"|"center"|"right";bg;color;outlineColor;outlineWidth;}|
// {comp:"transcription";textStyle:TextStyle;scrollByPage;animationType:"current-word"|"previous-text";animationStyle:TextStyle;}|
// {comp:"audio";volume;startFrom;}|
// {comp:"audiogram";position:"center"|"start"|"end";gap;barWidth;color;roundness;startFrom;smoothing;mirror;multiplier;}|
// {comp:"div";bg;}|
// {comp:"gif";objectFit:"cover"|"contain"|"fill"|"none";}|
// {comp:"graph";color;type:"line"|"bar"|"pie";max;min;animationStart;animationDuration;strokeWidth;gap;roundness;}|
// {comp:"image";objectFit:"cover"|"contain"|"fill"|"none";}|
// {comp:"lottie";backwards;loop;playbackRate;bg;}|
// {comp:"map";lat;lng;zoom;fill;stroke;strokeWidth;markerColor;markerSize;url;bg;}|
// {comp:"mockup";type:"iPhone"|"iPad"|"chrome"|"macbook"|"apple-watch"|"vs-code";}|
// {comp:"path";path;strokeColor;strokeWidth;viewBoxX;viewBoxY;viewBoxHeight;viewBoxWidth;fillColor;isRound;}|
// {comp:"qrcode";text;color;bg;}|
// {comp:"text";textStyle:TextStyle;text;}|
// {comp:"video";objectFit:"cover"|"contain"|"fill"|"none";startFrom;muted;volume;offthread;}|
// {comp:"progressbar";type:"spotify"|"line"|"circle"|"square";color;bg;barWidth;topRight;};
// type AnimationProps={type:"rotate"|"rotateX"|"rotateY"|"rotateZ"|"scale"|"scaleX"|"scaleY"|"scaleZ"|"translate"|"translateX"|"translateY"|"translateZ"|"skew"|"skewX"|"skewY"|"perspective";start;end;from;to;duration;mass;damping;stiffness;reverse;}
// type BaseProps={id;height;width;x;y;borderRadius;rotation;from;duration;opacity;animations?:AnimationProps[];}
// type ComponentProps=BaseProps&AllComponents;