# FE1_E2E_sumtime_library ⏰

[![npm](https://img.shields.io/npm/v/react-custom-timetable.svg)](https://www.npmjs.com/package/react-custom-timetable)

kernel360 프론트엔드 과정 E2E 라이브러리 레포입니다  
Timetable을 생성할 수 있는 컴포넌트 입니다. 직접 지정한 시작,종료 시간을 통해 Timetable의 영역이 그려지고 시간을 나누는 단위 또한 지정이 가능합니다. 다양한 커스텀 속성을 통해 원하는 시간표를 구현할 수 있습니다.

<br/>

# 🚀 Getting started :

### install

```
npm i react-custom-timetable
```

### props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| totalStartTime | 타임 테이블의 시작 시간을 나타냅니다. | `Date` |  |
| totalEndTime | 타임 테이블의 종료 시간을 나타냅니다. | `Date` |  |
| slotRange | 시간표를 어떤 단위로 표현할 것인지를 나타냅니다. ex. 30(30분), 60(60분) | `number` |  |
| taskList | 실제적으로 렌더링 될 정보를 나타냅니다. | `Task[]` |  |
| timeTableSize | 타임테이블의 크기를 선택합니다. | `string` |  |
| timetableDirection | 타임테이블의 방향을 선택합니다. (`COLNM`, `ROW`) | `'COLNM' \| 'ROW'` | `'COLNM'` |
| displayCurrentTime | 현재 시간을 나타낼지 여부를 설정합니다. | `boolean` | `false` |
| ellipsisText | 슬롯이 내부 콘텐츠를 표시하기 어려울 때 지정된 `ellipsisText`로 렌더링됩니다. | `string` | `""` |
| currentTimeLineStyle | 현재 시간을 나타내는 선의 스타일을 설정합니다. | `css` | `{}` |
| popoverType | 생략된 작업의 콘텐츠를 어떻게 표시할지 선택합니다. (`'CLICK'`, `'HOVER'`) | `'CLICK' \| 'HOVER'` | `'CLICK'` |
| timeTableStyle | 전체 타임테이블의 스타일을 설정합니다. | `css` | `{ backgroundColor: 'white' }` |
| timeSlotStyle | 시간을 나타내는 영역의 스타일을 설정합니다. | `css` | `{ color: 'black' }` |
| taskSlotStyle | 할 일을 나타내는 영역의 스타일을 설정합니다. | `css` | `{ color: 'black' }` |
| slotStyle | `timeSlot`과 `taskSlot`을 감싸는 영역의 스타일을 설정합니다. | `css` | `{}` |
| taskTheme | 랜덤 색상 지정 시 작업의 테마를 설정할 수 있습니다. |  | `random` |

```tsx
<Timetable // ROW
  totalStartTime={startTime}
  totalEndTime={endTime}
  slotRange={slotTime}
  taskList={taskListWithouttaskColor}
  timeTableSize="2000px"
  timetableDirection="ROW"
  displayCurrentTime
  timeTableStyle={{ backgroundColor: 'white' }}
  timeSlotStyle={{ color: 'black' }}
  taskSlotStyle={{ color: 'black' }}
  popoverType="HOVER"
  ellipsisText="..."
  taskTheme="random"
/>
```

<br/>

# 📄 기능

### [task 렌더링]

task(할일) 목록에 시작시간과 끝 시간이 있다면 이는 timetable에 보여지게 됩니다.

timetable이 보여질때 사용자는 다양한 속성을 선택 하여 상황에 맞게 사용할 수 있습니다.

<br/>

### task type

| name | description | type | default |
| --- | --- | --- | --- |
| id | task를 식별할 수 있는 고유한 식별자입니다. | number |  |
| title | task의 title 입니다. | string |  |
| subTitle | task에 대한 추가 설명입니다. | string |  |
| taskColor | 타임테이블에서 task의 색입니다. 없다면 무작위적으로 색을 지정합니다. | string or undefined |  |
| startTime | task가 시작할 시간입니다. | Date |  |
| endTime | task가 종료할 시간입니다. | Date |  |
| seed | taskColor없다면 random color의 바탕이 되는 값입니다. | string or number or undefined |  |

### [task 옵션]

props로 전달 받은 속성들을 사용하여, timetable의 다양한 디자인 혹은 기능을 추가할 수 있습니다.

- startTime, endTime : 시작시간과 끝나는 시간을 지정하여 timeTable의 시작 끝 범위를 지정 가능합니다.
- slotTime: slotTime을 지정하여 30분 단위 혹은 60분 단위 나아가 10분 단위로도 시간 간격 지정이 가능합니다.
- timeTableSize: 전체적인 timetable의 사이즈를 지정하여, 적절한 slot의 영역을 구할 수 있습니다.(slot 칸들의 사이즈드 모두 동일합니다.)
- timetableType: COLNM과 ROW 등 타임 테이블의 속성을 선택하여 사용자에게 맞는 timetable을 제공합니다
- displayCurrentTime: 현재 시간을 나타내는 line을 표현 할 수 있습니다.
- defaultValue: slot의 사이즈가 작아 내부 요소가 그려지기 힘들때, 해당 slot에 보여질 defaultValue를 입력받습니다

<br/>

### [task 기타]

timetable에서 한 task slot을 눌렀을 경우, 해당 slot의 정보가 popover 컴포넌트로 보여집니다.

이후 해당 popover 수정 삭제 등 다양한 기능이 추가 가능합니다.

<br/>

# 📚 내장함수

| Function Name | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `checkTaskListOverlap` | `taskList: T[]` | `boolean` | timetable에 그려질 taskList를 받아 list요소들 중 서로 겹치는 시간이 있는지 확인합니다. 겹치는 것이 있다면 true 반환합니다. |
| `calculateTargetPosition` | `startTime: Date` `endTime: Date` `targetStartTime: Date` `targetEndTime: Date` | `startPercent` `endPercent` | 위의 매개변수를 받아서 slot 시간안에 task 시간이 있다면, 전체 slot의 길이를 100%라 했을 때, 시작지점(startPercent)와 차지하는 영역(endPercent)를 반환해준다. |
| getTodayFromTime | `hours: number, minutes: number, second: number` | `Date` | 입력받은 시, 분, 초를 기반으로 오늘의 날짜를 생성해 반환합니다. |

<br/>

# 🏗 컴포넌트 소개 및 기능

### 컴포넌트 구조

```tsx

|-- Timetable //루트 컴포넌트로, 전체 시간표를 관리합니다.
    |-- CurrentTimeLine //현재 시간을 나타내는 컴포넌트
    |-- Slot //한 테스크 라인을 의미하고 이는 하위에 time,taskt슬롯을 가집니다.
        |-- TimeSlot // 시간 정보
        |-- TaskSlot // 할일 정보
            |-- TaskSlotItem // 할일이 적혀있는 컴포넌트(다양한 작업을 수행하기 위해 분리)

```

![image](https://github.com/user-attachments/assets/76efcf5a-7455-4b16-bb18-eb343c4d57bb)
