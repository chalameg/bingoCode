(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[711],{86640:function(n,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reset",function(){return a(31280)}])},7517:function(n,e,a){"use strict";a.d(e,{Z:function(){return c}});var i=a(85893),t=a(67294),o=a(37041),g=a(66174),_=a(41664),l=a.n(_),r=a(11163),s=a(93350),d=function(n){var e=n.text,a=n.href,g=n.last,_=(0,t.useContext)(s.Il).isBgWhite,d=(0,r.useRouter)().route;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"flex justify-center ".concat(o.footerLink),style:_?d==="/".concat(a)?{color:"#7D59F0"}:{color:"black"}:{color:"white"},children:(0,i.jsx)(l(),{href:a,children:(0,i.jsx)("a",{children:(0,i.jsx)("span",{children:e})})})}),!g&&(0,i.jsx)("hr",{style:{height:"20px"}})]})},c=function(){var n=(0,t.useContext)(s.Il).isBgWhite;return(0,i.jsxs)("div",{className:"".concat(o.footer),children:[(0,i.jsxs)("footer",{className:"".concat(o.footerContainer," flex justify-between align-center"),children:[(0,i.jsx)(d,{text:"About",href:"about"}),(0,i.jsx)(d,{text:"Blog",href:"blog"}),(0,i.jsx)(d,{text:"Privacy Policy",href:"privacy"}),(0,i.jsx)(d,{text:"Terms of Use",href:"terms",last:!0})]}),(0,i.jsx)("p",{style:n?{color:"#7D59F0"}:{color:"white"},className:"".concat(g.footerPoweredBy),children:"Powered By: 2play1"})]})}},90481:function(n,e,a){"use strict";var i=a(85893),t=a(78678),o=a(85578),g=a(62026),_=a(41664),l=a.n(_),r=a(67294),s=a(66174),d=a.n(s);e.Z=function(n){var e=n.isLoggedIn,a=n.handleLogout,_=(0,r.useState)(!1),s=_[0],c=_[1],P=(0,r.useState)("English"),m=P[0],b=P[1];return(0,i.jsxs)("div",{className:"".concat(d().landingPageHeader),children:[(0,i.jsx)("div",{className:"".concat(d().headerLeft),children:(0,i.jsx)(l(),{href:"/",children:(0,i.jsx)("a",{children:(0,i.jsx)("img",{src:"/static/images/bingo-logo.jfif",className:"".concat(d().logo)})})})}),(0,i.jsxs)("div",{className:"".concat(d().langTopContainer),children:[(0,i.jsx)("img",{src:"/static/images/language.svg"}),(0,i.jsxs)("span",{className:"flex align-center",style:{cursor:"pointer"},onClick:function(){return c(!s)},children:[(0,i.jsx)("span",{children:m}),s?(0,i.jsx)(t.Z,{fontSize:"small"}):(0,i.jsx)(o.Z,{fontSize:"small"})]}),e&&(0,i.jsx)("img",{src:"/static/images/logout.svg",style:{cursor:"pointer"},alt:"logout",onClick:function(){return a()}}),s&&(0,i.jsx)("div",{className:"".concat(d().langContainer),children:["English","\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430","\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22"].map((function(n,e){return(0,i.jsx)("div",{className:"".concat(m===n?d().langItemActive:d().langItem),children:m===n?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.Z,{style:{fontSize:"15px",marginRight:"5px"}}),(0,i.jsx)("span",{children:n})]}):(0,i.jsx)("span",{onClick:function(){return b(n)},style:{marginLeft:"20px"},className:"".concat(d().langHoverItem),children:n})},e)}))})]})]})}},88190:function(n,e,a){"use strict";var i=a(11852),t=a(32008),o={in:{animation:"in 500ms",animationName:i.ZP.keyframes((0,t.TS)(t.U2,t.d7),"in")},out:{animation:"in 1s",animationName:i.ZP.keyframes((0,t.TS)(t.U6,t.Af),"out")}};e.Z=o},31280:function(n,e,a){"use strict";a.r(e),a.d(e,{default:function(){return p}});var i=a(85893),t=a(9008),o=a.n(t),g=a(67294),_=a(87357),l=a(50099),r=a(57860),s=a(93350),d=a(88190),c=a(66174),P=a.n(c),m=a(7517),b=a(90481),u=function(){var n=(0,g.useContext)(s.Il),e=n.isLoggedIn,a=n.setIsBgWhite,t=(0,g.useState)(""),o=t[0],c=t[1],u=(0,g.useState)(""),p=u[0],f=u[1];(0,g.useEffect)((function(){a(!1)}),[]);return(0,i.jsx)(r.Z,{children:(0,i.jsx)("div",{className:"".concat(P().bgGradient),style:{fontFamily:"Inter"},children:(0,i.jsxs)("div",{style:{height:"100vh"},children:[(0,i.jsx)(b.Z,{isLoggedIn:e}),(0,i.jsxs)("div",{style:d.Z.in,className:"".concat(P().signInContainer),children:[(0,i.jsx)(_.Z,{mb:4,fontSize:"30px",color:"white",lineHeight:"36px",children:"Reset password"}),(0,i.jsx)(_.Z,{mb:4,fontSize:"16px",textAlign:"center",color:"white",lineHeight:"19px",children:"Your new password must be different from previous passwords"}),(0,i.jsx)(_.Z,{mb:2,children:(0,i.jsx)(l.Z,{type:"password",fullWidth:!0,value:o,onChange:function(n){return c(n.target.value)},label:"Password",variant:"outlined",placeholder:"Enter your password",size:"medium",InputLabelProps:{style:{fontSize:16}},inputProps:{style:{fontSize:16,color:"white"}}})}),(0,i.jsx)(_.Z,{mb:2,children:(0,i.jsx)(l.Z,{type:"password",fullWidth:!0,value:p,onChange:function(n){return f(n.target.value)},label:"Confirm password",variant:"outlined",placeholder:"Confirm your password",size:"medium",InputLabelProps:{style:{fontSize:16}},inputProps:{style:{fontSize:16,color:"white"}}})}),(0,i.jsx)(_.Z,{mb:2,children:(0,i.jsx)("button",{style:{width:"-webkit-fill-available"},className:"".concat(P().signUpBtn),children:"Reset"})})]}),(0,i.jsx)(m.Z,{})]})})})};var p=function(){return(0,i.jsxs)("div",{children:[(0,i.jsxs)(o(),{children:[(0,i.jsx)("meta",{name:"author",content:"bereket"}),(0,i.jsx)("meta",{name:"theme-color",content:"#ffffff"})]}),(0,i.jsx)(u,{})]})}},37041:function(n){n.exports={app:"styles_app__WG0Y2",topSection:"styles_topSection__AFikv",sound:"styles_sound___4qDA",womanAvatar:"styles_womanAvatar__MAQ1w",exitDoor:"styles_exitDoor__VMpP4",boardContainer:"styles_boardContainer__zf1F7",boardContainerCornerClip:"styles_boardContainerCornerClip__x1pAK",boardContainerCornerClipIOS:"styles_boardContainerCornerClipIOS__Hvg6w",crowdContainer:"styles_crowdContainer__Lzr8T",bottomSection:"styles_bottomSection__58rca",tabletView:"styles_tabletView__prO6b",tabletCamera:"styles_tabletCamera__UTtYu",cameraBar:"styles_cameraBar__qX4Tq",tabletTopBar:"styles_tabletTopBar__idLnx",mobileFeature:"styles_mobileFeature__H6_lU",time:"styles_time__0wB6I",title:"styles_title__9jT_J",mainTitle:"styles_mainTitle__9urcH",label:"styles_label__Eq5pB",heading1:"styles_heading1__89zHC",separator:"styles_separator__R7iRK",vertical:"styles_vertical__iAdHS",footer:"styles_footer__DI1lr",footerContainer:"styles_footerContainer__Jgmiv",footerLink:"styles_footerLink__ZOPwK",overlay:"styles_overlay__ZPRse",loader:"styles_loader___wsS4",soundControl:"styles_soundControl__FLnT9",playersCountLocation:"styles_playersCountLocation__T6FaB",playersIcon:"styles_playersIcon__TuCUi"}},66174:function(n){n.exports={landingPage:"landingPage_landingPage__QQwna",landingPageTop:"landingPage_landingPageTop__kxlE_",bgGradient:"landingPage_bgGradient__Xnhw_",landingPageHeader:"landingPage_landingPageHeader__joOWf",headerLeft:"landingPage_headerLeft__AHwDc",aboutUsheader:"landingPage_aboutUsheader__m_85R",headerRight:"landingPage_headerRight__BQSbX",signOutBtn:"landingPage_signOutBtn__xZ4FR",contactItems:"landingPage_contactItems__kmuyl",contactItemsMobile:"landingPage_contactItemsMobile__bbDYH",signInContainer:"landingPage_signInContainer__HXM4V",signUpBtn:"landingPage_signUpBtn__n8Qja",signUpContainer:"landingPage_signUpContainer__KnGGx",contactUsBtn:"landingPage_contactUsBtn__DLFf8",contactUsContainer:"landingPage_contactUsContainer__kdX_V",signInBtn:"landingPage_signInBtn__0l5J5",accountContainer:"landingPage_accountContainer__dS8DP",account:"landingPage_account__vGTBF",langContainer:"landingPage_langContainer__FkdWb",langItem:"landingPage_langItem__L_2DO",langItemActive:"landingPage_langItemActive__inyxW",langHoverItem:"landingPage_langHoverItem__dAEw4",coinsContainer:"landingPage_coinsContainer__xwvV_",landingPageBottom:"landingPage_landingPageBottom__aGO0K",landingPageBody:"landingPage_landingPageBody__oQ_Vc",bingo75Gradient:"landingPage_bingo75Gradient__HXoXI",bingo75Title:"landingPage_bingo75Title__T1c66",playNowBtn:"landingPage_playNowBtn__hFvRC",getCoinsBtn:"landingPage_getCoinsBtn___WpG_",giftsBtn:"landingPage_giftsBtn__gzqOK",comingSoonBtn:"landingPage_comingSoonBtn__NB78E",bingo90:"landingPage_bingo90__ntUey",bingo75:"landingPage_bingo75__rt1Os",bingoJP:"landingPage_bingoJP__I6kW3",bingo90JackpotText:"landingPage_bingo90JackpotText__GPY3O",bingoGiftButton:"landingPage_bingoGiftButton__gZBSb",biggerBingo90:"landingPage_biggerBingo90__1X03c",bingo90Balls:"landingPage_bingo90Balls___reNo",bingosContainer:"landingPage_bingosContainer__R0GtM",bingo90Title:"landingPage_bingo90Title__KgsqJ",bingo90Body:"landingPage_bingo90Body__Dalid",cardItemTitle:"landingPage_cardItemTitle__bRFbw",cardItem:"landingPage_cardItem__bovvJ",profile:"landingPage_profile__awOGR",profileCardItem:"landingPage_profileCardItem__Ilbaz",gameRecords:"landingPage_gameRecords__Omjm3",recordItem:"landingPage_recordItem__XmSfT",pcTime:"landingPage_pcTime__R7Tc_",mobileTime:"landingPage_mobileTime__RwBMn",center:"landingPage_center__0SUyd",auth:"landingPage_auth__LjdTX",logo:"landingPage_logo__X6fPo",userAvatar:"landingPage_userAvatar__fgI2H",rating:"landingPage_rating__8yCl8",updateIcon:"landingPage_updateIcon__YAWBx",giftModal:"landingPage_giftModal__m9BS4",giftAnswerModal:"landingPage_giftAnswerModal__YfVq0",giftModalTitle:"landingPage_giftModalTitle__PkvRx",giftModalInput:"landingPage_giftModalInput__NRFoG",friendsList:"landingPage_friendsList__xieO6",friend:"landingPage_friend__rC_m2",friendName:"landingPage_friendName__dmBes",choosen:"landingPage_choosen__Tillm",answerModal:"landingPage_answerModal__uKTbo",packageContainer:"landingPage_packageContainer__fDLq5",package:"landingPage_package__npuPY",btn:"landingPage_btn__cNj4h",paymentOptionContainer:"landingPage_paymentOptionContainer__mfsuy",paymentOption:"landingPage_paymentOption___aUNU",active:"landingPage_active__sC17r",paymentIcon:"landingPage_paymentIcon__X9MAi",btnContainer:"landingPage_btnContainer__8VmEG",footerPoweredBy:"landingPage_footerPoweredBy__HtkqP",bingo90TopTitleContainer:"landingPage_bingo90TopTitleContainer__yxeBU",logoBall:"landingPage_logoBall__QAGZI",bingo90play:"landingPage_bingo90play__eCrjH",bingo75play:"landingPage_bingo75play__ATkYh",bingo90luckyContainer:"landingPage_bingo90luckyContainer__2I0a7",bingo90Price:"landingPage_bingo90Price__7Q1Ex",bingo90PriceMobile:"landingPage_bingo90PriceMobile__LW85l",bingo90GameStartMobile:"landingPage_bingo90GameStartMobile__j99sb",bingo90GameStart:"landingPage_bingo90GameStart__aeBLG",bingo75Number:"landingPage_bingo75Number__zsE3J",bingo75AvatarImage:"landingPage_bingo75AvatarImage__oQjTd",bingo75CrowdImage:"landingPage_bingo75CrowdImage__agOEt",bingo75Bottom:"landingPage_bingo75Bottom__2OoYs",blogContainer:"landingPage_blogContainer__EGPMF",coinsImage:"landingPage_coinsImage__pHuSI",bingo75Box:"landingPage_bingo75Box__zlU7H",profileBalance:"landingPage_profileBalance__pTBYe",profileCoin:"landingPage_profileCoin___8M57",bingo75BingoBorder:"landingPage_bingo75BingoBorder__kg79u",bingo90BingoBorder:"landingPage_bingo90BingoBorder__MtRMQ",bingo90JackpotBorder:"landingPage_bingo90JackpotBorder__Bb9m6",bingo75JackpotBorder:"landingPage_bingo75JackpotBorder__oWceJ",bingoExtra:"landingPage_bingoExtra__sS4ut",bingoHiLoContainer:"landingPage_bingoHiLoContainer__kanlj",bingo75PlayButtonContainer:"landingPage_bingo75PlayButtonContainer__Wc0Ol",bingo90BallsMobile:"landingPage_bingo90BallsMobile__g6nTx",bingo90BallsAndBorderContainer:"landingPage_bingo90BallsAndBorderContainer__oYXa_",bingoBag:"landingPage_bingoBag__I5YF4",bingoJPImage:"landingPage_bingoJPImage__GYULv",bingo90BallContainer:"landingPage_bingo90BallContainer__5rv7F",authAccount:"landingPage_authAccount__CkxZ5",authBottomText:"landingPage_authBottomText__rBCMg",authForgotPassword:"landingPage_authForgotPassword__328bY",welcomeContainer:"landingPage_welcomeContainer__bSZU3",contact:"landingPage_contact__OhMIx",contactImg:"landingPage_contactImg__dSSSY",bingoExtraGame:"landingPage_bingoExtraGame__He7Ct",welcome:"landingPage_welcome__1CIQ8",welcomeStyleContainer:"landingPage_welcomeStyleContainer__4uW71",accountSignIn:"landingPage_accountSignIn__Cc7fs",langTopContainer:"landingPage_langTopContainer__Bl4Za",signInText:"landingPage_signInText__Cq9mz",namesHello:"landingPage_namesHello__8IiV9",bingoUserName:"landingPage_bingoUserName__2YBfJ",profileImages:"landingPage_profileImages__nCd_q",bingoNextGameContainer:"landingPage_bingoNextGameContainer__DPrT1",jackpotCreditValue:"landingPage_jackpotCreditValue__GMs4_",bingoAmmount:"landingPage_bingoAmmount__shAzw",b90ItemTitle:"landingPage_b90ItemTitle__6nNPY",gameRecordTitle:"landingPage_gameRecordTitle__6kHyj",recordUserImg:"landingPage_recordUserImg__U9uTw",recordUsername:"landingPage_recordUsername__d6iWb",recordSubtitle:"landingPage_recordSubtitle__K8rcj",recordSubtitleImg:"landingPage_recordSubtitleImg__RE1Nj",timeGameImg:"landingPage_timeGameImg__4bEAA",packageTitle:"landingPage_packageTitle__zkipJ",footer:"landingPage_footer__UoVK_",accountMessage:"landingPage_accountMessage__TdQTQ",bingo75BoxBg:"landingPage_bingo75BoxBg__VG_lu",bingoNumber:"landingPage_bingoNumber___3_I4",bingo75Image:"landingPage_bingo75Image__pH_t3",numberTitle:"landingPage_numberTitle__Z8NSm",bingo75BoxContainer:"landingPage_bingo75BoxContainer__7Uzya",bingo90FillContainer:"landingPage_bingo90FillContainer__84ob0",nameContainer:"landingPage_nameContainer__fb0id",profileAndWalletConatainer:"landingPage_profileAndWalletConatainer__poyi2",signInTopContainer:"landingPage_signInTopContainer__SfkdJ",bingo90BottomContainer:"landingPage_bingo90BottomContainer__Q9CSr",bingoPlayerCountContainer:"landingPage_bingoPlayerCountContainer__9Dkti",bingoImage:"landingPage_bingoImage__tLogU",bingo75Price:"landingPage_bingo75Price__L2qlu",names:"landingPage_names__MqwK_",giftModalContainer:"landingPage_giftModalContainer__ShSrm"}}},function(n){n.O(0,[61,169,652,86,281,99,226,669,774,888,179],(function(){return e=86640,n(n.s=e);var e}));var e=n.O();_N_E=e}]);