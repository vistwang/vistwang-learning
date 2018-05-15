import React,{Component} from 'react'

import {Media} from 'react-bootstrap'

import Monkey from '../img/monkey.png'

class MediaText extends Component{
    constructor(props){
        super(props)
    }




    render(){
        return(
            <div className="media-box">
                <Media>
                    <Media.Left>
                        <img width={164} height={164} src={Monkey} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading className="text-primary">物是人非事事休,欲语泪先流</Media.Heading>
                        <p className="text-muted">年少太轻狂，误入IT行。白发森森立，两眼直茫茫。语言数十种，无一称擅长。三十而立时，无房单身郎。世人皆说官人好，没关系，当不了。常加班，起不早，挣的不够去搓澡。BUG、CODE知多少，只是屏幕显人老。</p>
                    </Media.Body>
                </Media>
                <Media>
                    <Media.Left>
                        <img width={164} height={164} src={Monkey} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading className="text-primary">抽刀断水水更流，举杯消愁愁更愁</Media.Heading>
                        <p>无数假期渺茫茫，夜三更，bug调出千百行；香烟一半，犹如饥渴似疯狂。抬起头颅，细数窗前星光，人生历历何等惆怅；思量思量，日何已出，为何希望依久不晴朗！千帆竞，胸怀精卫填海心，纵横七海贯其名，淘尽浪沙誓得金。bug查，coding凌晨不知乏，精益求精不掩瑕，编程人生亦无涯。莫言世道如浪深，莫言工作似胆苦，我辈心中有光明，不惧未来勇前行。</p>
                        {/*<Media>*/}
                            {/*<Media.Left>*/}
                                {/*<img width={164} height={164} src={Monkey} alt="Image"/>*/}
                            {/*</Media.Left>*/}
                            {/*<Media.Body>*/}
                                {/*<Media.Heading className="text-primary">寻寻觅觅,冷冷清清,凄凄惨惨戚戚</Media.Heading>*/}
                                {/*<p>老夫聊发少年狂，不小心，选错行。误入IT，两眼泪茫茫日撸代码三千行，疯狂、疯狂，人未老，珠已黄。日出东隅照我床，悠悠青龙倚斜阳。陋室区区徒四壁，代码行行正铿锵。*/}
                                    {/*夜夜搞项目，敲码三四点。郁郁无头绪，哽咽等天亮。放手搏一搏，程序全报错。妹子人家牵，bug自己查。方法属性类，一个都不会。左右不是人，猿来程序员。</p>*/}
                            {/*</Media.Body>*/}
                        {/*</Media>*/}
                    </Media.Body>
                </Media>
                <Media>
                    <Media.Body>
                        <Media.Heading className="text-primary">假作真时真亦假，无为有处有还无</Media.Heading>
                        <p>IT放两旁，闲来把码敲，余音仍绕梁。码农压力大，愿君更健康！白发三千丈，coding泪两行，不识加班累，只缘bug狂。
                            夜半话凄凉，转眼泪千行，日日工期紧，亦为重构忙。久易无定论，命悬需求方，四顾前途路，一步三踉跄。</p>
                    </Media.Body>
                    <Media.Right>
                        <img width={164} height={164} src={Monkey} alt="Image"/>
                    </Media.Right>
                </Media>
                <Media>
                    <Media.Left>
                        <img width={164} height={164} src={Monkey} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading className="text-primary">明日复明日 明日何其多。我生待明日，万事成蹉跎</Media.Heading>
                        <p>与你相遇我就走进了一个循环,
                            我把青春放进你的堆栈,
                            取出的明天总是残缺不全;
                        </p>
                        <p>小虫儿蜿蜒,
                            偶尔爬到我的梦里面,
                            没有梦蝶的浪漫,
                            月光揉碎烦恼，补偿我的盗梦空间;
                        </p>

                        <p>每个键排队在指缝间,
                            悠闲的时候按着特波键,
                            偶尔想退格回到昨天,
                            把接口方案再看一遍;
                        </p>
                        <p>有时想摆脱需求的纠缠,
                            而她总期待下一刻的约见,
                            总想投产后把缘分兑现,
                            上线时却总是有点忐忑不安;
                        </p>
                        <p>总想发现一个指针,
                            指向明天的将要溢出的幸福,
                            总想设置一个数组,
                            数组里装满了美女和别墅,
                            有时候却轻轻的对自己说，蓝瘦，香菇。
                        </p>
                    </Media.Body>
                    {/*<Media.Right>*/}
                        {/*<img width={164} height={164} src={Monkey} alt="Image"/>*/}
                    {/*</Media.Right>*/}
                </Media>
            </div>
        )
    }
}

export default MediaText