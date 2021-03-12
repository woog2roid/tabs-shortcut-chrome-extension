# tabs-shortcut-chrome-extension
- 자주 쓰는 탭 묶음을 기억하고 다시 이용할 수 있게 해주는 크롬 확장 프로그램
- Chrome extensions that help you open several tabs at once

### 설치방법(How To Install)
1. 오른쪽의 Release를 눌러 Assets에서 .zip를 다운받는다. 상단의 Code를 눌러 다운받으면, 작업중인 미완성 버전을 다운받을 수도 있다.
2. chrome 기반의 브라우저에서 url 창에 [chrome://extensions](chrome://extensions)을 입력한다.
3. 우측 상단의 "개발자 모드"를 키고 .zip 파일을 압축해제한 후 "압축해제 된 확장 프로그램을 로드합니다."를 눌러 파일을 로드한다.   
4. 원활한 사용을 위해 크롬을 다시 시작하는 것을 추천한다. 앱을 다운로드 후, 탭에서 새로고침을 해야 정상적으로 작동한다.
--- 
1. Press Release on the right to download .zip from Assets. Otherwise, you may download the incomplete version under development. 
2. In a chrome-based browser, type [chrome://extensions](chrome://extensions) in the url window.
3. Turn on "Developer Mode" in the top right corner, decompress the .zip file, and press "Load unpatched extension" to load the file.
4. It is recommended to restart Chrome for smooth use. After downloading the app, you need to refresh tab to work properly.


### v1.0.0
- 구글 계정과 자동으로 연동
- ctrl + shift + E를 눌러 확장프로그램 열기
- \+를 클릭하고 이름을 입력해 탭 묶음 추가
- 탭 묶음을 눌러 탭 묶음 동시 열기
- 탭 묶음 옆의 \-을 눌러 삭제
- 하단의 디테일 창을 눌러 탭 묶음 항목들의 url 확인
- Automatically synchronize with google accounts
- Open extension with ctrl + shift + E
- To add the tab budndlem, click \+ and enter the name
- To open the tab bundle, click the tab bundle
- To delete the tab bundle, click \-
- To check the urls of tab bundle, click the details

### v1.1.0
- 하단의 디테일 창에서 url들을 확인할 뿐 아니라 직접 수정도 가능함  
CRUD가 모두 가능(Create, Read, Update, Delete)
  - http:// https:// 포맷팅을 지키지 않았을 때 발생하는 에러 픽스
  - 빈 문자열을 입력하면 항목 삭제 가능
  - 리스트 추가 버튼을 눌러서 url을 수동으로 추가가능
- Not only do you see urls in the detail below, but you can also modify urls  
CRUD available (Create, Read, Update, Delete)
  - error fix that occurs when url formatting is not observed
  - delete url by entering an empty string
  - add url by clicking add list and entering new url

### v1.1.1
- 탭 번들을 추가하고 새로고침을 해야만 리스트가 보이던 문제 해결
- url이 chrome://으로 시작하는 크롬 기본 페이지에서는 동작에 오류가 있던 오류 해결  
  - 정확히는 크롬 윈도우에 http:// https:// 로 시작하는 url을 가진 탭이 하나 있어야함
  - chrome API에서 지원하지 않는 기능을 로직을 통해 구현하여서 생긴 문제
- 그 외 다수의 구글 저장소의 비동기에서 비롯된 버그 수정
- 추가적으로, sync storage를 사용하기 때문에 분당, 시간당 저장소 이용횟수에 제한이 있습니다.
- bug fix: now added tab bundle shows immediately
- bug fix: now extension works properly at pages started with "chrome://"  
  - To be exact, the Chrome window must have one tab with url starting with http:// https://
  - This is a problem by implementing features that are not supported by the Chrome API
- bug fix: bugs from asynchronization of chrome storage 
- Additionally, because of sync storage, there is a limit on the number of times

### v1.1.2
- 탭 번들을 추가하고 바로 리스트에서 보이지 않던 오류 수정
- 디테일 창의 UI 수정
- 디테일 창에서 url 수정 시, url이 qualified되지 않았으면 자동으로 qualified 시켜주는 기능 제거
- bug fix: now added tab bundle shows immediately
- UI modification in detail window
- function delete: automatically qualify url

### v1.1.3
- 탭 번들을 삭제하는 부분의 코드 수정
- code cleanup: tab bundle delete