import React, { Component } from 'react'
import { Colors, Sizes } from './enums'

import { 
    Button,
    Switch,
    Radio,
    Checkbox,
    Input,
    Progress,
    Tag,
    Text,
    Icon,
    Loop,
    Alert
} from './index'


export default class App extends Component {

  onClickHandler() {
    console.log('Hello m1')
  }

  render() {

    return (
      <div className="main">
        <h2>Welcome to M1-UI-React</h2>
        <h3>Button sizes</h3>
        <Button color={Colors.PRIMARY} size={Sizes.LARGE}> Large</Button>
        <Button color={Colors.PRIMARY}> Default</Button>
        <Button color={Colors.PRIMARY} size={Sizes.SMALL}> Small</Button>
        <Button color={Colors.PRIMARY} size={Sizes.XSMALL}> XSmall</Button>
        <h3>Button colors</h3>
        <Button color={Colors.Default} onClick={this.onClickHandler}>Default</Button>
        <Button color={Colors.PRIMARY}>PRIMARY</Button>
        <Button color={Colors.SUCCESS}>SUCCESS</Button>
        <Button color={Colors.DANGER}>DANGER</Button>
        <Button color={Colors.WARNING}>WARNING</Button>
        <Button color={Colors.TEXT}>TEXT</Button>
        <h3>Button disabled</h3>
        <Button color={Colors.Default} disabled>Default</Button>
        <Button color={Colors.PRIMARY} disabled>PRIMARY</Button>
        <Button color={Colors.TEXT} disabled>TEXT</Button>
        <h3>Button Link</h3>
        <Button href="http://www.m1world.com" target="_blank">Button Link</Button>
        <Button color={Colors.PRIMARY} href="http://www.m1world.com" target="_blank">PRIMARY</Button>
        <Button color={Colors.SUCCESS} href="http://www.m1world.com" target="_blank">SUCCESS</Button>
        <Button color={Colors.DANGER} href="http://www.m1world.com" target="_blank">DANGER</Button>
        <Button color={Colors.WARNING} href="http://www.m1world.com" target="_blank">WARNING</Button>
        <Button color={Colors.TEXT} href="http://www.m1world.com" target="_blank">TEXT</Button>
        <Button color={Colors.Default} href="http://www.m1world.com" disabled>Disabled</Button>
        <h3>Switch Base</h3>
        <Switch />
        <Switch input={{defaultChecked: true}} />
        <h3>Radio</h3>
        <Radio name="myRadio" text="选项1" value="jerry" defaultChecked onChange={this.onClickHandler}/> <Radio name="myRadio" text="选项2"/> <Radio name="myRadio" text="选项3" disabled/>
        <h3>Checkbox</h3>
        <Checkbox text={'Select Me'} />
        <Checkbox text={'Select Me'} defaultChecked/>
        <Checkbox text={'Select Me'} disabled/>
        <Checkbox text={'Select Me'} defaultChecked disabled/>
        <h3>Input</h3>
        <Input type={'text'} placeholder="Please input some plain text" />
        <Input type={'text'} placeholder="Please input some plain text" disabled />
        <h3>Progress</h3>
        <Progress value={'50'}/>
        <br/>
        <Progress value={'80'} dynamic={true}/>
        <h3>Loop</h3>
        <Loop r={50} cx={60} cy={60} width={10} value={20} />
        <Loop r={50} cx={60} cy={60} width={10} value={40} />
        <Loop r={50} cx={60} cy={60} width={10} value={60} />
        <Loop r={50} cx={60} cy={60} width={10} value={80} />
        <Loop r={50} cx={60} cy={60} width={10} value={100} />
        <Loop r={50} cx={60} cy={60} width={15} value={100} />
        <h3>Tag</h3>
        <Tag>默认</Tag>
        <Tag color={Colors.PRIMARY} >默认</Tag>
        <Tag color={Colors.SUCCESS} >默认</Tag>
        <Tag color={Colors.DANGER} >默认</Tag>
        <Tag color={Colors.WARNING} >默认</Tag>
        <Tag color={Colors.IGNORE} >默认</Tag>
        <Tag size={Sizes.LARGE}>默认</Tag>
        <Tag color={Colors.PRIMARY} size={Sizes.LARGE} >默认</Tag>
        <Tag color={Colors.SUCCESS} size={Sizes.LARGE} >默认</Tag>
        <Tag color={Colors.DANGER}  size={Sizes.LARGE}>默认</Tag>
        <Tag color={Colors.WARNING} size={Sizes.LARGE} >默认</Tag>
        <Tag color={Colors.IGNORE}  size={Sizes.LARGE}>默认</Tag>
        <h3>Tag Removeable</h3>

        <Tag removeable>默认</Tag>
        <Tag color={Colors.PRIMARY} removeable>默认</Tag>
        <Tag color={Colors.SUCCESS} removeable>默认</Tag>
        <Tag color={Colors.DANGER} removeable>默认</Tag>
        <Tag color={Colors.WARNING} removeable>默认</Tag>
        <Tag color={Colors.IGNORE} removeable >默认</Tag>
        <Tag size={Sizes.LARGE} removeable>默认</Tag>
        <Tag color={Colors.PRIMARY} size={Sizes.LARGE} removeable>默认</Tag>
        <Tag color={Colors.SUCCESS} size={Sizes.LARGE} removeable>默认</Tag>
        <Tag color={Colors.DANGER}  size={Sizes.LARGE} removeable>默认</Tag>
        <Tag color={Colors.WARNING} size={Sizes.LARGE} removeable>默认</Tag>
        <Tag color={Colors.IGNORE}  size={Sizes.LARGE} removeable>默认</Tag>
        <h3>Tag Checkable</h3>
        <Tag checkable>默认</Tag>
        <Tag color={Colors.PRIMARY} checkable>默认</Tag>
        <Tag color={Colors.SUCCESS} checkable>默认</Tag>
        <Tag color={Colors.DANGER} checkable>默认</Tag>
        <Tag color={Colors.WARNING} checkable>默认</Tag>
        <Tag color={Colors.IGNORE} checkable >默认</Tag>
        <Tag size={Sizes.LARGE} checkable>默认</Tag>
        <Tag color={Colors.PRIMARY} size={Sizes.LARGE} checkable>默认</Tag>
        <Tag color={Colors.SUCCESS} size={Sizes.LARGE} checkable>默认</Tag>
        <Tag color={Colors.DANGER}  size={Sizes.LARGE} checkable>默认</Tag>
        <Tag color={Colors.WARNING} size={Sizes.LARGE} checkable>默认</Tag>
        <Tag color={Colors.IGNORE}  size={Sizes.LARGE} checkable>默认</Tag>
        <h3>Text</h3>
        <Text color={Colors.PRIMARY}>主要</Text>
        <Text color={Colors.SUCCESS}>成功</Text>
        <Text color={Colors.DANGER}>错误</Text>
        <Text color={Colors.WARNING}>警告</Text>
        <Text color={Colors.IGNORE}>忽视</Text>
        <h3>Icon</h3>
        <Icon color={Colors.PRIMARY} name={'user'} />
        <Icon color={Colors.SUCCESS} name={'check-circle'} />
        <Icon color={Colors.DANGER} name={'times-circle'} />
        <Icon color={Colors.WARNING} name={'info-circle'} />
        <Icon color={Colors.IGNORE} name={'eye'} />
        <h3>Alert</h3>
        <Alert color={Colors.PRIMARY} > 主要 </Alert>
        <Alert color={Colors.SUCCESS} > 成功 </Alert>
        <Alert color={Colors.DANGER} > 错误 </Alert>
        <Alert color={Colors.WARNING} > 警告 </Alert>
        <Alert color={Colors.IGNORE} > 忽视 </Alert>
      </div>
    )
  }
}