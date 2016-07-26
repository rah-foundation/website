import * as React from 'react';
import {Link} from 'react-router';
import {t} from '../../translate';

const style = require('./style.less');

export default class FAQ extends React.Component<{}, {}> {
    render() {
        return (
            <div className={style.content}>
                <h1>{t('faq')}</h1>
                <p>متن نمونه</p>
                <p>
                    بیماری‌های عفونی ناشی از ارگانیسم‌هایی چون باکتری‌ها، ویروس‌ها، قارچ‌ها و انگل‌ها هستند. درون و بیرون بدن ما ارگانیسم‌های فراوانی زندگی می‌کنند که معمولاً بی‌ضرر و حتا برای سلامت ما مفیدند. اما ممکن است در شرایط خاص، برخی از این ارگانیسم‌ها به بیماری منجر شوند.

                </p>
                <p>
                برخی از بیماری‌های عفونی می‌تواند از فردی به فرد دیگر منتقل شوند، برخی با گزش حشرات و حیوانات و برخی با خوردن غذا یا آب آلوده و برخی دیگر با قرارگرفتن و تماس با آن‌ها در محیط‌زیست منتقل می‌شوند.
                </p>
                <p>
                ارگانیسم‌های زیر سبب بروز بیماری‌های عفونی می‌شوند:
                </p>
                <h2>نمونه h2</h2>
                <p>

                باکتری‌ها. عامل بیماری‌هایی چون گلودرد، عفونت‌های دستگاه ادراری و سل. این موجودات تک‌سلولی‌اند.
                ویروس‌ها. حتا از باکتری‌ها هم کوچک‌ترند و منشأ بسیاری از بیماری‌ها چون سرماخوردگی و ایدزند.
                قارچ‌ها. قارچ‌ها (fungi) عامل به‌وجودآورنده‌ی بسیاری از بیماری‌های پوستی مانند عفونت‌های قارچی (ringworm) در پای ورزشکاران‌اند. انواع دیگر قارچ‌ها می‌توانند موجب عفونت ریه یا سیستم عصبی شود.
                انگل‌ها. عامل به‌وجودآورنده‌ی مالاریا انگلی بسیار کوچک است که از طریق نیش پشه منتقل می‌شود. هم‌چنین مدفوع حیوانات ناقل سایر انگل‌ها به انسان است.
                تماس مستقیم
                ساده‌ترین راه سرایت بیماری‌های عفونی تماس با شخص یا حیوانی است که به این بیماری مبتلاست. از چهار راه بیماری‌های عفونی منتشر می‌شوند:
                </p>
                <p>
                انسان به انسان. از راه‌های متداول سرایت بیماری‌های عفونی، انتقال مستقیم باکتری، ویروس یا سایر میکروب‌ها از فردی به فرد دیگر است که از طریق لمس، سرفه، بوسه، تبادل مایعات بدن از تماس جنسی یا انتقال خون از فرد مبتلا به فردی دیگر منتقل می‌شود. ممکن است کسی که این میکروب‌ها را منتقل می‌کند هیچ نشانه‌ای از این بیماری نداشته باشد و فقط حامل آن میکروب باشد.
                حیوانات به انسان. ممکن است گازگرفتن یا خراشیدن حیوانی آلوده، حتا حیوانی خانگی، شما را بیمار کند یا حتا در موارد بسیار خاص کشنده باشد. انتقال یا سروکارداشتن با فضولات حیوانی می‌تواند بسیار خطرناک باشد. مثلاً ممکن است از طریق خالی‌کردن و تمیزکردن جعبه‌ی ادرار و مدفوع گربه‌تان به عفونت توکسوپلاسموزیس (toxoplasmosis) مبتلا شوید.
                مادر به جنین. ممکن است مادر باردار میکروب‌های عامل بیماری‌های عفونی را به جنین خود منتقل کند. برخی از این میکروب‌ها می‌توانند از طریق جفت و برخی دیگر که در مهبل‌اند، ممکن است در هنگام زایمان به نوزاد منتقل شوند.
                محیط به انسان. برخی از عوامل بیماری زا می توانند در خاک، آب، هوا و سایر سطوح باقی بمانند و باعث انتقال بیماری ها شوند. برخی از بیماری های قارچی یا وبا از این گروه هستند.
                عوامل خطر
                ممکن است هرکسی دچار بیماری‌های عفونی شود، اما در بیش‌تر مواقع هنگامی بیمار می‌شوید که سیستم ایمنی بدن‌تان به‌درستی کار نکند. سیستم ایمنی بدن تحت‌تأثیر عوامل زیر ضعیف می‌شود:
                </p>
                <p>
                مصرف استروئید یا داروهای دیگر که سبب سرکوب سیستم ایمنی بدن‌تان می‌شود، همانند داروهای ضد طرد(anti-rejection) برای عضو پیوندی.
                اگر به ایدز مبتلایید.
                اگر به بیماری یا سرطانی خاص مبتلایید که سیستم ایمنی بدن‌تان را تحت‌تأثیر قرار می‌دهد.
                علاوه بر این، ممکن است شرایط دیگری نیز شما را مستعد ابتلا به عفونت کند. دستگاه‌های کاشته‌شده‌ی پزشکی، سوءتغذیه و سن برخی از این شرایط‌اند.
                </p>
                <h2>
                عوارض
                </h2>
                <p>
                بیماری‌های عفونی عوارضی متفاوت دارند. اما برخی از آن‌ها از جمله ذات‌الریه، مننژیت و ایدز می‌توانند زندگی انسان را تهدید کنند. ابتلا به چند نوع از عفونت‌ها در درازمدت موجب افزایش خطر ابتلا به سرطان می‌شود:
                </p>

                ویروس پاپیلومای انسانی (Human papillomavirus). ممکن است موجب سرطان گردنه‌ی رحم شود.
                هلیکوباکتر پیلوری (Helicobacter pylori). می‌تواند به سرطان معده منجر شود.
                ویروس ابشتاین بار (Epstein-Barr). ممکن است موجب سرطان لنفوم شود.
                درمان و داروها
                آنتی‌بیوتیک‌ها
                آنتی‌بیوتیک‌ها براساس شباهت در نوع، در خانواده‌های متعدد طبقه‌بندی می‌شوند. هریک از گونه‌های مختلف باکتری را نوع خاصی از آنتی‌بیوتیک‌ها از بین می‌برد. به همین دلیل شناخت نوع باکتری، که عامل بیماری است، در درمان بهتر و مؤثرتر به پزشک کمک می‌کند.

                آنتی‌بیوتیک فقط برای درمان عفونت‌های باکتریایی استفاده می‌شود. چراکه آن‌ها هیچ تأثیری بر بیماری‌های ویروسی ندارند. اما گاهی اوقات تشخیص نوع میکروب بیماری سخت است، برای مثال برخی از انواع ذات‌الریه (pneumonia) ویروسی‌اند، حال آن‌که در برخی دیگر از انواع آن باکتری‌ها عامل به‌وجودآورنده‌اند.

                استفاده‌ی بیش از حدِ آنتی‌بیوتیک‌ها باعث مقاوم‌شدن انواع مختلف باکتری‌ها می‌شود. مقاومت باکتری‌ها در برابر آنتی‌بیوتیک‌ها باعث سخت‌شدن درمان آن‌ها می‌شود.

                داروهای ضد ویروس
                داروهایی برای درمان برخی از ویروس‌ها و نه همه‌ی آن‌ها ساخته شده است. مثلاً برای ویروس‌هایی که موجب بیماری‌های زیر می‌شوند، دارویی وجود ندارد:

                ایدز
                تب‌خال
                هپاتیت B
                هپاتیت C
                آنفولانزا
                داروهای ضد قارچ
                در افرادی که سیستم ایمنی ضعیفی دارند، عفونت‌های شدید قارچی می‌توانند شش‌ها یا غشای مخاطی دهان و گلو و یا حتی مغز را مبتلا و عفونی کنند. برای درمان این عفونت‌ها، ضد قارچ‌ها (Antifungals) استفاده می‌شوند.

                داروهای ضد انگل
                عامل به‌وجودآورنده‌ی برخی از بیماری‌ها، از جمله مالاریا، انگل‌های بسیار کوچک است. با وجود این‌که برای درمان این بیماری‌ها دارو وجود دارد، اما برخی از این انگل‌ها به دارو مقاوم شده‌اند.

                پیشگیری
                عوامل عفونی می‌توانند از طرق زیر به بدن وارد شوند:

                تماس پوستی یا زخم و جراحت
                استنشاق میکروب‌های موجود در هوا
                خوردن غذا یا آب آلوده
                گزیدگی پشه یا کنه
                تماس جنسی
            </div>
        );
    }
}
