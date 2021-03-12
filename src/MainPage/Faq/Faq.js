import React, {useState} from 'react';
import useStyles from './faq-style';
import {Container, useMediaQuery, useTheme, Grid, Hidden, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Parallax from '../../components/Parallax/Hexagonal';
import Title from '../../components/Title';
import {useSelector} from 'react-redux';

const faqData = [
    {
      q_en: 'What is the meaning of cryptocurrency?',
      q_cn: '加密货币是什么意思？',
      a_en: 'Literally it does not mean anything. It is a sequence of words without a sense of Latin derivation that make up a text also known as filler text, fictitious, blind or placeholder',
      a_cn: '从字面上看，它没有任何意义。 这是一个没有拉丁语衍生词的单词序列，构成了一个文本，也称为填充文本，虚构的，盲目的或占位符 '
    },
    {
      q_en: 'Why is crypto dolor used?',
      q_cn: '为什么使用加密货币dolor？',
      a_en: 'The Lorem Ipsum text is used to fill spaces designated to host texts that have not yet been published. They use programmers, graphic designers, typographers to get a real impression of the digital / advertising / editorial product they are working on.',
      a_cn: "Lorem Ipsum文本用于填充指定用于托管尚未发布的主机文本的空间。 他们使用程序员，图形设计师，印刷商来获得他们正在开发的数字/广告/社论产品的真实印象。"
    },
    {
      q_en: 'What is the most used version?',
      q_cn: '什么是最常用的版本？',
      a_en: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      a_cn: 'Lorem ipsum dolor兴奋地参加比赛，但是要采取这样一个好主意，所以您应该花一些时间去做。 在未来的几年中，除了从中获得一些好处外，我们当中谁曾进行过艰苦的体育锻炼。 任何人都无权因渴望逃避支付报酬而感到过失。 期望者的愿望不应是盲目的例外，它们正在抚慰心灵，这就是那些放弃零食将军办公室的人的错。 '
    },
    {
      q_en: 'What are the origins of Lorem Ipsum Dolor Sit?',
      q_cn: 'Lorem Ipsum Dolor Sit的起源是什么？',
      a_en: 'Its origins date back to 45 BC. In fact, his words were randomly extracted from the De finibus bonorum et malorum , a classic of Latin literature written by Cicero over 2000 years ago.',
      a_cn: '它的起源可以追溯到公元前45年。 实际上，他的话语是从《西菲罗（De finibus bonorum et Malorum）》中随机抽取的，后者是西塞罗（Cicero）2000年前写的经典拉丁文学作品 '
    },
    {
      q_en: 'What is the original text of Lorem Ipsum Dolor Sit Amet?',
      q_cn: 'lorem ipsum dolor sit amet的原始文字是什么？',
      a_en: 'The original Latin text Dal De finibus bonorum et malorum sections 1.10.32 and 1.10.33 - Marco Tullio Cicerone« Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. »',
      a_cn: '原文Dalton关于好和坏的部分1.10.32和1.10.33-Marcus Tullius Cicero但我必须向你解释所有这些指责享乐和称赞痛苦的错误观念，整个事情是开放的，以及从这个事实出发，人类幸福的主要构建者这一事实得以展现。对于一个没有享乐的人本身来说，不是因为享乐，被鄙视，憎恨，还是逃跑，而是因为它们属于他们的巨大悲伤，由于他们乐意跟随他，他们不知道；任何人也不会属于他们痛苦的痛苦，而且非常重要，因为他爱美联储，因为痛苦是要获得意志，但是因为在某些情况下，同样的沦陷之时，他们可能会努力寻求快乐和痛苦，一些很棒。以vCard E的形式下载信息，除了从中获得一些好处之外，我们中的哪个人会进行艰苦的体育锻炼？但是，谁有权发现错误，谁愿意去找错，那没有烦人的后果，或者谁避免痛苦，却没有随之而来的愉悦呢？ [33]然而，他们的真相，他们在指责，而他只是被仇恨，值得指挥官使用。他们被不自觉的欲望所蒙蔽，同样也应受到责备。在任职期间，他们抛弃了精神上的普遍软弱，即他劳动和痛苦的软弱。但这需要简单和容易的区分。在您的空闲时间，我们可以选择一个男人和一个未婚的人，如果没有什么可以阻止的，那就更少了，这是上帝最取悦的，我们可能会做的，每一种快乐都将受到欢迎并避免一切痛苦。但是在某些情况下，责任，义务或义务往往会产生，而且必须拒绝享乐并接受烦恼。因此，被选为这些事情的人必须注意一个聪明的人，他应该要么拒绝享乐以确保其他更大的人，要么他忍受痛苦以避免更糟的痛苦。 »'
    },
  ];
  

function Faq(props){
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const {faqText} = props;
    const [expanded, setExpanded] = useState(0);
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
      console.log()
    return(
        <div className={classes.root}>
            <div className={classes.parallax}>
                <Parallax />
            </div>
            <Container fixed >
                <Grid container spacing={6}>
                    <Grid item md={6} className={classes.faqContent}>
                        <Title text={faqText[`${nextI18Next}_title`]} align='center' />
                        <Typography variant="subtitle2" align='center' component="p">
                            {faqText[`${nextI18Next}_subtitle`]}
                        </Typography>
                        <div className={classes.illustration}>
                            <img src="/images/crypto/faq.png" alt="illustration" />
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <div className={classes.accordion}>
                            {faqData.map((item, index)=>{
                                return(
                                    <div className={classes.item} key={index.toString()}>
                                        <Accordion classes={{root: classes.paper}} expanded={expanded === index} onChange={handleChange(index)}>
                                            <AccordionSummary classes={{content: classes.content, expanded: classes.expanded}}>
                                                <Typography className={classes.heading}>{item[`q_${nextI18Next}`]}</Typography>
                                                <ExpandMoreIcon className={classes.icon} />
                                            </AccordionSummary>
                                            <AccordionDetails classes={{root: classes.detail}}>
                                                <Typography>{item[`a_${nextI18Next}`]}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                            })}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Faq;