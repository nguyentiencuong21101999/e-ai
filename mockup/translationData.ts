export enum TranslationDirection {
  EN_TO_VI = 'en_to_vi',
  VI_TO_EN = 'vi_to_en'
}

export interface DialogueItem {
  id: string
  original: string
  translation?: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Topic {
  id: string
  title: string
  description: string
  dialogues: DialogueItem[]
}

export interface TranslationData {
  [TranslationDirection.EN_TO_VI]: Topic[]
  [TranslationDirection.VI_TO_EN]: Topic[]
}

export const translationData: TranslationData = {
  [TranslationDirection.EN_TO_VI]: [
    {
      id: 'daily-conversation',
      title: 'Hội thoại hàng ngày',
      description: 'Các đoạn hội thoại thường gặp trong cuộc sống',
      dialogues: [
        {
          id: 'greeting-1',
          original: 'Hello, how are you today? I hope you\'re doing well. I was just thinking about our conversation yesterday and wanted to follow up on a few things. The weather has been absolutely beautiful lately, hasn\'t it? I\'ve been trying to spend more time outdoors because of it. Speaking of which, have you had a chance to visit that new park they opened downtown? I heard it has some amazing walking trails and a really nice pond. My friend Sarah went there last weekend and couldn\'t stop talking about how peaceful it was. She said it\'s the perfect place to unwind after a long day at work. I\'m thinking of checking it out this Saturday if the weather stays nice. Would you be interested in joining me? We could grab some coffee beforehand and make a whole morning of it.',
          difficulty: 'easy'
        },
        {
          id: 'greeting-2', 
          original: 'Good morning! Did you sleep well last night? I notice you look a bit tired today. I had trouble sleeping myself because of all the construction noise from the building next door. They\'ve been working on that renovation project for weeks now, and it seems like they start earlier every day. I\'ve been thinking about getting some earplugs or maybe a white noise machine to help block out the sound. My neighbor mentioned that she uses a fan at night, and it works wonders for drowning out external noise. Have you ever tried anything like that? I remember when I was in college, I had a roommate who snored terribly, and I had to find creative ways to get a good night\'s rest. It\'s amazing how much better you feel when you\'ve had proper sleep. I always notice the difference in my mood and energy levels throughout the day.',
          difficulty: 'easy'
        },
        {
          id: 'weather-1',
          original: 'The weather is really nice today, isn\'t it? It\'s such a refreshing change from the rainy week we had. I was getting so tired of being cooped up indoors and not being able to enjoy any outdoor activities. The sunshine today just makes everything feel more vibrant and alive. I decided to walk to work instead of taking the bus because I wanted to soak up as much of this beautiful weather as possible. On my way here, I noticed that the cherry blossoms are starting to bloom in the park. It\'s always such a magical sight when spring finally arrives. The way the light filters through the trees creates these amazing patterns on the ground. I love how the changing seasons affect people\'s moods too. Everyone seems more cheerful and energetic when the weather improves. It makes me want to plan some outdoor activities for the weekend. Maybe a picnic or a hiking trip would be perfect.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'business',
      title: 'Giao tiếp kinh doanh',
      description: 'Hội thoại trong môi trường công việc',
      dialogues: [
        {
          id: 'meeting-1',
          original: 'Could you please schedule a meeting for next Tuesday? I need to discuss the quarterly budget review with the department heads. We\'ve been working on this project for several months now, and I think it\'s time to evaluate our progress and make any necessary adjustments. The finance team has been asking for updated projections, and I want to make sure everyone is on the same page before we submit our final report to the board. I\'d like to invite representatives from marketing, sales, operations, and human resources. The meeting should probably last about two hours to give everyone enough time to present their findings and discuss any concerns. Could we book the large conference room on the third floor? It has the projector and video conferencing equipment we\'ll need for the presentation. Also, please send out the agenda at least 48 hours in advance so everyone can come prepared. I want this to be a productive session where we can make some real decisions about our budget allocation for the next quarter.',
          difficulty: 'medium'
        },
        {
          id: 'presentation-1',
          original: 'I would like to present our quarterly results to the board. We\'ve had an exceptional three months, and I believe the board will be very pleased with our performance. Our sales have increased by 23% compared to the same quarter last year, which exceeds our initial projections by a significant margin. The marketing campaign we launched in January has been incredibly successful, generating more leads than we anticipated. Our customer satisfaction scores have also improved, with 94% of clients rating our service as excellent or very good. The new product line we introduced has been well-received in the market, and we\'re already seeing strong demand from both existing and new customers. Our operational efficiency has improved as well, thanks to the process improvements we implemented earlier this year. We\'ve managed to reduce costs while maintaining high quality standards. I think these results demonstrate that our strategic initiatives are working effectively. The presentation will include detailed charts and graphs to illustrate our progress, and I\'ll also outline our plans for the next quarter.',
          difficulty: 'hard'
        },
        {
          id: 'negotiation-1',
          original: 'We need to discuss the terms and conditions of this contract. I\'ve reviewed the proposal you sent last week, and while I appreciate the comprehensive nature of the document, there are several points that require clarification and potential modification. First, regarding the delivery timeline, the proposed schedule seems quite aggressive given the scope of work involved. Our team has analyzed the requirements, and we believe a more realistic timeframe would be beneficial for both parties to ensure quality deliverables. Second, the payment terms outlined in section 4.2 don\'t align with our standard business practices. We typically work with a different payment structure that provides more flexibility for our cash flow management. Additionally, the liability clauses in section 7 appear to be heavily weighted in favor of one party. We\'d like to propose a more balanced approach that protects both organizations appropriately. The intellectual property rights section also needs some adjustment to clarify ownership of derivative works. I believe we can find mutually acceptable solutions to these issues through open dialogue and compromise.',
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'travel',
      title: 'Du lịch',
      description: 'Các tình huống khi đi du lịch',
      dialogues: [
        {
          id: 'hotel-1',
          original: 'I have a reservation under the name Smith. I booked a king-size room for three nights starting today. I made the reservation about two weeks ago through your website, and I should have received a confirmation email with the booking reference number. Let me check my phone for the details. The confirmation number is HTL-2024-789456. I specifically requested a non-smoking room on a higher floor with a city view if possible. I also mentioned in my booking that I\'m celebrating my anniversary, so I was hoping you might have some special amenities available. During the reservation process, I added the breakfast package and late check-out option. I noticed on your website that you offer airport shuttle service - is that still available, and what time does it run? Also, I\'m wondering about the hotel\'s fitness center and spa facilities. Are they open 24 hours, or do they have specific operating hours? One more thing - I\'ll need to extend my stay by one additional night if you have availability. My flight got delayed, so I\'ll be staying until Thursday instead of Wednesday.',
          difficulty: 'medium'
        },
        {
          id: 'direction-1',
          original: 'Excuse me, could you tell me how to get to the nearest subway station? I\'m completely lost and my phone\'s GPS seems to be acting up. I\'m trying to get to downtown, specifically to the Museum of Modern Art. I was told that taking the subway would be the fastest and most economical way to get there. I\'m not familiar with this area at all since I\'m visiting from out of town. This is actually my first time using public transportation in this city. Do I need to buy a special card or can I pay with cash? How much does a one-way ticket typically cost? I\'m also wondering about the schedule - do the trains run frequently during the day? I have a museum appointment at 2 PM, so I want to make sure I have enough time to get there without rushing. Are there any particular subway lines I should take, or transfers I need to make? I\'ve heard that some stations can be quite confusing for tourists. Also, is there a map or guide that you\'d recommend for navigating the subway system? I want to be prepared for my return trip as well.',
          difficulty: 'medium'
        },
        {
          id: 'restaurant-1',
          original: 'Could I see the menu, please? Do you have any vegetarian options? I\'m traveling with a friend who has some dietary restrictions, so I want to make sure we can both find something delicious to eat. We\'ve been walking around the city all day and we\'re quite hungry. This restaurant was recommended to us by the concierge at our hotel, who said you\'re known for accommodating different dietary needs. Are there any dishes that are completely vegan, or can some of the vegetarian options be modified? My friend is also allergic to nuts, so I need to be careful about that as well. What would you recommend as your most popular vegetarian dish? I\'m also curious about the portion sizes - are they suitable for sharing, or should we each order our own entrée? For drinks, do you have any local specialties or signature cocktails that we should try? We\'re interested in experiencing authentic local cuisine during our visit. Oh, and one more question - do you accept credit cards, or is it a cash-only establishment? We want to make sure we\'re prepared when it comes time to pay the bill.',
          difficulty: 'medium'
        }
      ]
    },
    // SPORT
    {
      id: 'sport',
      title: 'Thể thao',
      description: 'Các đoạn hội thoại về thể thao, vận động, và hoạt động ngoài trời',
      dialogues: [
        {
          id: 'sport-1',
          original: 'Bạn có thường xuyên chơi thể thao không? Tôi thấy việc tập luyện thể dục thể thao rất quan trọng để duy trì sức khỏe và tinh thần thoải mái. Mỗi tuần tôi thường dành ít nhất ba buổi để chạy bộ trong công viên gần nhà. Ngoài ra, tôi còn tham gia câu lạc bộ bóng đá vào cuối tuần cùng bạn bè. Chúng tôi thường tổ chức các trận đấu giao hữu và sau đó cùng nhau ăn uống, trò chuyện. Việc vận động không chỉ giúp tôi khỏe mạnh mà còn giúp tôi mở rộng các mối quan hệ xã hội. Bạn thích môn thể thao nào nhất? Bạn có lời khuyên nào để duy trì động lực tập luyện không?',
          difficulty: 'easy'
        },
        {
          id: 'sport-2',
          original: 'Gần đây tôi bắt đầu học bơi vì muốn cải thiện sức khỏe và giảm căng thẳng sau giờ làm việc. Ban đầu tôi khá lo lắng vì không biết bơi, nhưng nhờ sự hướng dẫn tận tình của huấn luyện viên, tôi đã dần tự tin hơn dưới nước. Bơi lội không chỉ giúp tôi rèn luyện thể lực mà còn giúp tôi thư giãn đầu óc. Tôi nhận ra rằng việc học một môn thể thao mới ở tuổi trưởng thành cũng là một cách để thử thách bản thân và vượt qua nỗi sợ hãi. Bạn đã bao giờ thử học một môn thể thao mới chưa? Cảm giác của bạn thế nào?',
          difficulty: 'medium'
        },
        {
          id: 'sport-3',
          original: 'Tôi rất ngưỡng mộ các vận động viên chuyên nghiệp vì họ phải luyện tập rất chăm chỉ và kiên trì để đạt được thành tích cao. Đặc biệt là trong các kỳ Thế vận hội, tôi luôn theo dõi các trận đấu và cảm thấy tự hào khi thấy vận động viên Việt Nam giành huy chương. Tôi nghĩ rằng thể thao không chỉ là thi đấu mà còn là nơi thể hiện tinh thần đoàn kết, ý chí vượt khó và niềm tự hào dân tộc. Bạn có thần tượng vận động viên nào không? Bạn nghĩ điều gì là quan trọng nhất để thành công trong thể thao?',
          difficulty: 'hard'
        }
      ]
    },
    // FOOD
    {
      id: 'food',
      title: 'Món ăn',
      description: 'Các đoạn hội thoại về món ăn, sở thích ăn uống và trải nghiệm ẩm thực',
      dialogues: [
        {
          id: 'food-1',
          original: 'Bạn thích ăn món gì nhất? Tôi là người rất thích khám phá các món ăn mới, đặc biệt là các món ăn đường phố. Mỗi khi đi du lịch, tôi luôn tìm cơ hội để thưởng thức đặc sản địa phương. Gần đây tôi có dịp thử món bánh xèo miền Trung, lớp vỏ giòn rụm kết hợp với nước mắm chua ngọt thật tuyệt vời. Ngoài ra, tôi cũng rất thích các món ăn Nhật như sushi và ramen. Bạn có món ăn nào mà bạn không thể cưỡng lại không?',
          difficulty: 'easy'
        },
        {
          id: 'food-2',
          original: 'Tôi đang cố gắng ăn uống lành mạnh hơn nên thường tự nấu ăn ở nhà thay vì ăn ngoài. Việc tự chuẩn bị bữa ăn giúp tôi kiểm soát được nguyên liệu và khẩu phần, đồng thời tiết kiệm chi phí. Tôi thường lên thực đơn cho cả tuần và mua sẵn thực phẩm vào cuối tuần. Một trong những món tôi hay nấu là salad trộn với nhiều loại rau củ và ức gà nướng. Bạn có bí quyết nào để duy trì chế độ ăn uống cân bằng không?',
          difficulty: 'medium'
        },
        {
          id: 'food-3',
          original: 'Có lần tôi tham gia một lớp học nấu ăn để học cách làm các món Âu như pasta, pizza và bánh ngọt. Ban đầu tôi gặp khá nhiều khó khăn vì các công thức khá phức tạp và đòi hỏi sự tỉ mỉ. Tuy nhiên, sau vài buổi thực hành, tôi đã tự tin hơn và có thể tự tay chuẩn bị một bữa tiệc nhỏ cho bạn bè. Tôi nhận ra rằng nấu ăn không chỉ là kỹ năng sống mà còn là cách để gắn kết mọi người lại với nhau. Bạn đã bao giờ thử nấu một món ăn hoàn toàn mới chưa? Kỷ niệm đáng nhớ nhất của bạn trong bếp là gì?',
          difficulty: 'hard'
        }
      ]
    },
    // FAMILY
    {
      id: 'family',
      title: 'Gia đình',
      description: 'Các đoạn hội thoại về gia đình, các thành viên và giá trị truyền thống',
      dialogues: [
        {
          id: 'family-1',
          original: 'Gia đình bạn có bao nhiêu người? Gia đình tôi gồm bố mẹ, tôi và em gái. Chúng tôi rất gắn bó với nhau và thường xuyên tổ chức các buổi ăn tối chung vào cuối tuần. Mỗi dịp lễ Tết, cả nhà lại quây quần bên nhau, cùng nhau chuẩn bị mâm cơm và kể cho nhau nghe những câu chuyện vui. Tôi cảm thấy rất may mắn khi có một gia đình hạnh phúc và luôn ủng hộ lẫn nhau. Bạn có kỷ niệm nào đáng nhớ với gia đình không?',
          difficulty: 'easy'
        },
        {
          id: 'family-2',
          original: 'Tôi rất trân trọng những giá trị truyền thống mà ông bà và cha mẹ đã truyền lại. Mỗi dịp về quê, tôi lại được nghe ông bà kể về thời thơ ấu, những khó khăn và nỗ lực của các thế hệ trước để xây dựng cuộc sống tốt đẹp hơn. Những câu chuyện đó giúp tôi hiểu hơn về nguồn cội và ý nghĩa của sự đoàn kết trong gia đình. Tôi nghĩ rằng việc giữ gìn và phát huy truyền thống là điều rất quan trọng trong xã hội hiện đại. Gia đình bạn có truyền thống đặc biệt nào không?',
          difficulty: 'medium'
        },
        {
          id: 'family-3',
          original: 'Gần đây tôi nhận ra rằng dù công việc bận rộn đến đâu, dành thời gian cho gia đình vẫn là ưu tiên hàng đầu. Mỗi tối, tôi cố gắng về nhà sớm để cùng ăn cơm và trò chuyện với mọi người. Cuối tuần, chúng tôi thường đi dã ngoại hoặc xem phim cùng nhau. Tôi tin rằng sự quan tâm, chia sẻ và lắng nghe là chìa khóa để xây dựng một gia đình hạnh phúc. Bạn làm gì để gắn kết các thành viên trong gia đình?',
          difficulty: 'hard'
        }
      ]
    }
  ],
  [TranslationDirection.VI_TO_EN]: [
    {
      id: 'daily-conversation',
      title: 'Daily Conversations',
      description: 'Common daily life conversations',
      dialogues: [
        {
          id: 'greeting-vi-1',
          original: 'Xin chào, hôm nay bạn có khỏe không? Tôi thấy bạn trông có vẻ hơi mệt mỏi. Có phải do công việc gần đây quá bận rộn không? Tôi nghe nói công ty bạn đang có một dự án lớn và mọi người phải làm việc overtime khá nhiều. Thật sự thì tôi cũng hiểu cảm giác đó vì tuần trước tôi cũng phải làm việc đến tận 9 giờ tối mỗi ngày. Cơ thể chúng ta cần thời gian để nghỉ ngơi và phục hồi năng lượng. Bạn có thường xuyên tập thể dục không? Tôi thấy việc duy trì một lối sống lành mạnh rất quan trọng, đặc biệt là khi công việc căng thẳng. Cuối tuần này bạn có kế hoạch gì để thư giãn không? Có lẽ chúng ta nên đi uống cà phê hoặc xem phim để giải tỏa stress. Tôi biết một quán cà phê mới mở gần đây, không gian rất yên tĩnh và thức uống cũng ngon. Bạn có muốn thử không?',
          difficulty: 'easy'
        },
        {
          id: 'greeting-vi-2',
          original: 'Chào buổi sáng! Tối qua bạn có ngủ ngon không? Tôi thấy trời hôm nay đẹp quá nên tâm trạng cũng phấn chấn hơn. Mấy hôm nay trời mưa liên tục làm tôi cảm thấy hơi uể oải. Nhưng hôm nay thấy nắng ấm như thế này thì muốn ra ngoài hoạt động luôn. Bạn có thích thời tiết như thế này không? Tôi định đi dạo trong công viên gần nhà vào chiều nay để hít thở không khí trong lành. Công viên đó vừa được tu sửa lại, trồng thêm nhiều hoa và cây xanh. Mùa này là mùa hoa anh đào nở nên chắc sẽ rất đẹp. Năm ngoái tôi có chụp ảnh ở đó và được nhiều người khen. Bạn có muốn cùng đi không? Chúng ta có thể mua ít đồ ăn vặt rồi ngồi trong công viên trò chuyện. Sẽ rất thú vị nếu được nghỉ ngơi và tận hưởng thời tiết đẹp như thế này.',
          difficulty: 'easy'
        },
        {
          id: 'weather-vi-1',
          original: 'Hôm nay thời tiết thật đẹp phải không? Sau mấy ngày mưa bão thì cuối cùng trời cũng quang đãng trở lại. Tôi nhớ hôm qua còn lo lắng vì dự báo thời tiết nói sẽ có bão đổ bộ vào bờ biển. May mà cơn bão đã yếu đi và chuyển hướng. Những ngày mưa như vậy làm tôi cảm thấy buồn chán vì không thể ra ngoài làm những việc mình thích. Nhưng hôm nay với ánh nắng chan hòa như thế này, tôi muốn tận dụng tối đa thời gian ở ngoài trời. Có lẽ tôi sẽ đi dạo biển hoặc leo núi gần đây. Bạn có biết những địa điểm nào đẹp để dã ngoại không? Tôi muốn tìm một nơi có cảnh quan đẹp để chụp ảnh và thư giãn. Nghe nói gần đây có mở một khu du lịch sinh thái mới với nhiều hoạt động thú vị. Chúng ta cùng tìm hiểu và lên kế hoạch đi chơi vào cuối tuần nhé!',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Communication',
      description: 'Workplace conversations',
      dialogues: [
        {
          id: 'meeting-vi-1',
          original: 'Bạn có thể lên lịch một cuộc họp vào thứ Ba tuần sau được không? Chúng ta cần thảo luận về kế hoạch marketing cho quý mới và đánh giá hiệu quả của chiến dịch vừa qua. Tôi đã nhận được báo cáo từ các phòng ban và thấy có một số vấn đề cần được giải quyết khẩn cấp. Đặc biệt là về ngân sách và phân bổ nguồn lực cho các dự án sắp tới. Tôi muốn mời đại diện từ phòng marketing, bán hàng, tài chính và nhân sự tham gia cuộc họp này. Cuộc họp dự kiến sẽ kéo dài khoảng 2-3 tiếng để đảm bảo mọi người có đủ thời gian trình bày ý kiến và thảo luận. Bạn có thể đặt phòng họp lớn ở tầng 5 không? Phòng đó có đầy đủ thiết bị họp trực tuyến và màn hình lớn để chúng ta có thể chia sẻ presentation. Nhớ gửi agenda trước ít nhất 48 tiếng để mọi người chuẩn bị tài liệu cần thiết. Tôi cũng muốn có bản ghi chép cuộc họp để sau này có thể theo dõi tiến độ thực hiện.',
          difficulty: 'medium'
        },
        {
          id: 'presentation-vi-1',
          original: 'Tôi muốn trình bày kết quả quý này với hội đồng quản trị. Quý vừa qua công ty chúng ta đã đạt được những thành tựu đáng kể và tôi tin rằng ban lãnh đạo sẽ rất hài lòng với những con số này. Doanh thu đã tăng 28% so với cùng kỳ năm ngoái, vượt xa mục tiêu ban đầu chúng ta đề ra. Đặc biệt, sản phẩm mới mà chúng ta ra mắt đã nhận được phản hồi tích cực từ khách hàng và thị trường. Tỷ lệ hài lòng của khách hàng cũng tăng lên 96%, cao nhất từ trước đến nay. Bộ phận marketing đã thực hiện thành công chiến dịch quảng cáo trên mạng xã hội, thu hút được hơn 50,000 khách hàng mới. Chi phí vận hành đã được tối ưu hóa nhờ việc áp dụng công nghệ mới và cải tiến quy trình làm việc. Tôi sẽ chuẩn bị một bài thuyết trình chi tiết với biểu đồ và số liệu cụ thể để minh họa cho sự phát triển của công ty. Đồng thời, tôi cũng sẽ đề xuất kế hoạch cho quý tiếp theo để duy trì đà tăng trưởng này.',
          difficulty: 'hard'
        },
        {
          id: 'negotiation-vi-1',
          original: 'Chúng ta cần thảo luận về các điều khoản và điều kiện của hợp đồng này. Tôi đã xem xét kỹ lưỡng bản đề xuất mà bên bạn gửi và nhận thấy có một số điểm cần được điều chỉnh để phù hợp hơn với lợi ích của cả hai bên. Trước tiên, về thời hạn thực hiện dự án, lịch trình đề xuất có vẻ hơi gấp gáp so với khối lượng công việc. Đội ngũ của chúng tôi đã phân tích kỹ và tin rằng cần thêm thời gian để đảm bảo chất lượng sản phẩm cuối cùng. Thứ hai, điều khoản thanh toán trong mục 4.2 chưa phù hợp với chính sách tài chính của công ty chúng tôi. Chúng tôi thường áp dụng hình thức thanh toán theo từng giai đoạn để đảm bảo dòng tiền. Ngoài ra, các điều khoản về trách nhiệm pháp lý có vẻ thiên về một bên. Chúng tôi muốn đề xuất một cách tiếp cận cân bằng hơn để bảo vệ quyền lợi của cả hai công ty. Phần về quyền sở hữu trí tuệ cũng cần được làm rõ thêm, đặc biệt là về việc sử dụng các sản phẩm phái sinh.',
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'food-culture',
      title: 'Food & Culture',
      description: 'Vietnamese food and cultural expressions',
      dialogues: [
        {
          id: 'food-vi-1',
          original: 'Món phở này có vị thế nào? Có cay không? Tôi lần đầu tiên ăn phở ở quán này nên muốn biết thêm về hương vị. Nghe nói quán này nổi tiếng với nước dùng được ninh từ xương bò trong nhiều giờ liền. Tôi rất thích những món ăn có hương vị đậm đà và thơm ngon. Bạn có thể giới thiệu thêm về các loại topping không? Tôi thấy có thịt bò, gân, chả và nhiều loại rau thơm. Rau thơm này ăn có tác dụng gì không? Tôi biết người Việt rất chú trọng đến việc kết hợp rau thơm với món ăn để cân bằng dinh dưỡng. Nước chấm ở đây có làm từ gì? Có phải là tương ớt truyền thống không? Tôi cũng muốn thử thêm bánh cuốn nếu quán có. Nghe nói bánh cuốn là một món ăn sáng phổ biến của người Việt. Bạn có thể kể thêm về những món ăn đặc trưng khác của miền Bắc không? Tôi đang muốn tìm hiểu về văn hóa ẩm thực Việt Nam.',
          difficulty: 'medium'
        },
        {
          id: 'culture-vi-1',
          original: 'Tết Nguyên Đán là dịp quan trọng nhất trong năm đối với người Việt. Đây là thời gian gia đình sum họp và thể hiện lòng biết ơn với tổ tiên. Trong những ngày Tết, mọi người thường về quê để đoàn tụ cùng gia đình và thăm viếng các họ hàng. Nhà nào cũng trang trí bằng hoa đào, hoa mai và những câu đối đỏ với lời chúc tốt lành. Bàn thờ tổ tiên được dọn dẹp sạch sẽ và cúng những món ăn truyền thống như bánh chưng, bánh tét, thịt kho trứng. Trẻ em đều mong chờ được lì xì từ người lớn và khoác những bộ áo dài đẹp. Người ta cũng thường đi chùa để cầu may mắn và bình an cho năm mới. Nhiều gia đình còn có tục đi xin chữ đầu năm để mong muốn học hành và công việc thuận lợi. Âm thanh pháo hoa và tiếng trống chiêng vang khắp nơi tạo nên không khí lễ hội rộn ràng. Tết không chỉ là dịp nghỉ lễ mà còn là lúc con người gắn kết với nhau và gìn giữ những giá trị truyền thống quý báu.',
          difficulty: 'hard'
        },
        {
          id: 'family-vi-1',
          original: 'Cuối tuần này gia đình tôi sẽ về quê thăm ông bà. Đã lâu rồi chúng tôi mới có dịp về thăm do công việc ở thành phố khá bận rộn. Ông bà tôi năm nay đã gần 80 tuổi nhưng vẫn rất khỏe mạnh và minh mẫn. Họ sống trong ngôi nhà cũ mà gia đình đã xây từ nhiều thập kỷ trước. Xung quanh nhà có khu vườn nhỏ với đủ loại cây ăn trái và rau xanh. Mỗi lần về, bà tôi lại nấu những món ăn mà tôi yêu thích từ nhỏ như canh chua cá, thịt kho tàu và chả cá lá vướng. Ông tôi thường kể cho tôi nghe những câu chuyện về thời thơ ấu của bố mẹ và lịch sử gia đình. Những câu chuyện đó giúp tôi hiểu thêm về truyền thống và giá trị mà gia đình đã truyền lại qua nhiều thế hệ. Lần này tôi định mang theo vợ và con để các cháu có cơ hội gần gũi với ông bà hơn. Tôi muốn con mình lớn lên trong tình yêu thương của đại gia đình và hiểu được ý nghĩa của việc hiếu thảo.',
          difficulty: 'medium'
        }
      ]
    },
    // SPORT
    {
      id: 'sport',
      title: 'Sport',
      description: 'Conversations about sports, exercise, and outdoor activities',
      dialogues: [
        {
          id: 'sport-en-1',
          original: 'Do you often play sports? I think regular exercise is very important for maintaining good health and a positive mindset. Every week, I try to spend at least three sessions jogging in the park near my house. Besides that, I also join a football club with my friends on weekends. We usually organize friendly matches and then have meals and chats together. Exercising not only keeps me healthy but also helps me expand my social relationships. What is your favorite sport? Do you have any tips for staying motivated to work out?',
          difficulty: 'easy'
        },
        {
          id: 'sport-en-2',
          original: 'Recently, I started learning to swim because I wanted to improve my health and reduce stress after work. At first, I was quite nervous because I didn’t know how to swim, but thanks to the patient guidance of my coach, I gradually became more confident in the water. Swimming not only helps me build physical strength but also relaxes my mind. I realized that learning a new sport as an adult is also a way to challenge myself and overcome fears. Have you ever tried learning a new sport? How did you feel?',
          difficulty: 'medium'
        },
        {
          id: 'sport-en-3',
          original: 'I really admire professional athletes because they have to train very hard and persistently to achieve high results. Especially during the Olympics, I always follow the matches and feel proud when I see Vietnamese athletes winning medals. I think sports are not just about competition but also about showing solidarity, determination, and national pride. Do you have any athlete idols? What do you think is the most important thing for success in sports?',
          difficulty: 'hard'
        }
      ]
    },
    // FOOD
    {
      id: 'food',
      title: 'Food',
      description: 'Conversations about food, eating habits, and culinary experiences',
      dialogues: [
        {
          id: 'food-en-1',
          original: 'What is your favorite food? I really enjoy exploring new dishes, especially street food. Whenever I travel, I always look for opportunities to try local specialties. Recently, I had a chance to try Central Vietnamese pancakes, which have a crispy crust and are served with sweet and sour fish sauce—absolutely delicious. I also love Japanese dishes like sushi and ramen. Is there any food you simply can’t resist?',
          difficulty: 'easy'
        },
        {
          id: 'food-en-2',
          original: 'I am trying to eat healthier, so I often cook at home instead of eating out. Preparing my own meals helps me control the ingredients and portions, and it also saves money. I usually plan my menu for the whole week and buy groceries in advance. One of my go-to dishes is a mixed salad with lots of vegetables and grilled chicken breast. Do you have any tips for maintaining a balanced diet?',
          difficulty: 'medium'
        },
        {
          id: 'food-en-3',
          original: 'Once, I joined a cooking class to learn how to make European dishes like pasta, pizza, and desserts. At first, I found it quite challenging because the recipes were complicated and required attention to detail. However, after a few practice sessions, I became more confident and was able to prepare a small party for my friends. I realized that cooking is not just a life skill but also a way to bring people together. Have you ever tried cooking a completely new dish? What is your most memorable kitchen experience?',
          difficulty: 'hard'
        }
      ]
    },
    // FAMILY
    {
      id: 'family',
      title: 'Family',
      description: 'Conversations about family, members, and traditional values',
      dialogues: [
        {
          id: 'family-en-1',
          original: 'How many people are there in your family? My family has four members: my parents, my younger sister, and me. We are very close and often have dinner together on weekends. On holidays, the whole family gathers, prepares meals, and shares funny stories. I feel very lucky to have a happy family that always supports each other. Do you have any memorable family moments?',
          difficulty: 'easy'
        },
        {
          id: 'family-en-2',
          original: 'I really appreciate the traditional values that my grandparents and parents have passed down. Every time I visit my hometown, I hear stories about their childhood, the hardships, and the efforts of previous generations to build a better life. Those stories help me understand more about my roots and the importance of unity in the family. I think preserving and promoting traditions is very important in modern society. Does your family have any special traditions?',
          difficulty: 'medium'
        },
        {
          id: 'family-en-3',
          original: 'Recently, I realized that no matter how busy work gets, spending time with family is always a top priority. Every evening, I try to come home early to have dinner and talk with everyone. On weekends, we often go on picnics or watch movies together. I believe that care, sharing, and listening are the keys to building a happy family. What do you do to connect family members?',
          difficulty: 'hard'
        }
      ]
    }
  ]
} 