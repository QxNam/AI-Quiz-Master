
export interface LessonData {
  chapter: string;
  lessons: string[];
}

export interface SubjectCurriculum {
  [grade: string]: LessonData[];
}

export interface CurriculumData {
  [subject: string]: SubjectCurriculum;
}

export const KET_NOI_TRI_THUC: CurriculumData = {
  "Toán học": {
    "1": [
      { chapter: "Chương 1: Các số đến 10", lessons: ["Các số 1, 2, 3", "Các số 4, 5", "Số 0", "Số 6, 7, 8, 9, 10"] },
      { chapter: "Chương 2: Phép cộng, phép trừ trong phạm vi 10", lessons: ["Phép cộng trong phạm vi 10", "Phép trừ trong phạm vi 10"] },
      { chapter: "Chương 3: Các số đến 20", lessons: ["Các số từ 11 đến 20", "Phép cộng, phép trừ trong phạm vi 20"] },
      { chapter: "Chương 4: Các số đến 100", lessons: ["Các số tròn chục", "Các số có hai chữ số", "So sánh các số có hai chữ số"] },
      { chapter: "Chương 5: Độ dài và đo độ dài. Tuần và ngày", lessons: ["Đo độ dài", "Xăng-ti-mét. Đo độ dài", "Tuần lễ. Ngày trong tuần", "Xem đồng hồ"] },
      { chapter: "Chương 6: Phép cộng, phép trừ (không nhớ) trong phạm vi 100", lessons: ["Cộng các số tròn chục", "Trừ các số tròn chục", "Phép cộng dạng 25 + 4, 25 + 40", "Phép trừ dạng 39 - 2, 39 - 20", "Phép cộng dạng 34 + 23", "Phép trừ dạng 57 - 24"] },
      { chapter: "Chương 7: Hình học trực quan", lessons: ["Vị trí, định hướng trong không gian", "Khối lập phương, khối hộp chữ nhật", "Hình tròn, hình tam giác, hình vuông, hình chữ nhật"] }
    ],
    "2": [
      { chapter: "Chương 1: Ôn tập và bổ sung", lessons: ["Ôn tập các số đến 100", "Ôn tập phép cộng, phép trừ không nhớ", "Ôn tập về hình học và đo lường"] },
      { chapter: "Chương 2: Phép cộng, phép trừ qua 10 trong phạm vi 20", lessons: ["Phép cộng qua 10", "Phép trừ qua 10", "Bảng cộng, bảng trừ qua 10"] },
      { chapter: "Chương 3: Phép cộng, phép trừ có nhớ trong phạm vi 100", lessons: ["Phép cộng có nhớ", "Phép trừ có nhớ"] },
      { chapter: "Chương 4: Làm quen với hình khối", lessons: ["Hình tứ giác", "Khối trụ, khối cầu"] },
      { chapter: "Chương 5: Phép nhân và phép chia", lessons: ["Phép nhân", "Bảng nhân 2, 5", "Phép chia", "Bảng chia 2, 5"] },
      { chapter: "Chương 6: Phép cộng, phép trừ có nhớ trong phạm vi 1000", lessons: ["Các số đến 1000", "So sánh các số có ba chữ số", "Phép cộng không nhớ trong phạm vi 1000", "Phép trừ không nhớ trong phạm vi 1000", "Phép cộng có nhớ trong phạm vi 1000", "Phép trừ có nhớ trong phạm vi 1000"] },
      { chapter: "Chương 7: Hình học và đo lường", lessons: ["Đường thẳng, đường cong", "Đường gấp khúc", "Hình tứ giác", "Ki-lô-mét. Mét", "Mi-li-mét", "Khối trụ, khối cầu"] }
    ],
    "3": [
      { chapter: "Chương 1: Ôn tập và bổ sung", lessons: ["Ôn tập các số đến 1000", "Ôn tập phép cộng, phép trừ trong phạm vi 1000", "Tìm thành phần chưa biết của phép tính"] },
      { chapter: "Chương 2: Bảng nhân, bảng chia", lessons: ["Bảng nhân 3, 4, 6, 7, 8, 9", "Bảng chia 3, 4, 6, 7, 8, 9", "Gấp một số lên nhiều lần", "Giảm một số đi nhiều lần"] },
      { chapter: "Chương 3: Làm quen với hình phẳng, hình khối", lessons: ["Góc vuông, góc không vuông", "Hình tam giác, hình tứ giác", "Hình chữ nhật, hình vuông", "Khối trụ, khối cầu"] },
      { chapter: "Chương 4: Phép nhân, phép chia trong phạm vi 100", lessons: ["Nhân số có hai chữ số với số có một chữ số", "Chia số có hai chữ số cho số có một chữ số"] },
      { chapter: "Chương 5: Các số đến 10 000", lessons: ["Các số có bốn chữ số", "So sánh các số trong phạm vi 10 000", "Điểm ở giữa, trung điểm của đoạn thẳng"] },
      { chapter: "Chương 6: Phép cộng, phép trừ trong phạm vi 10 000", lessons: ["Phép cộng trong phạm vi 10 000", "Phép trừ trong phạm vi 10 000", "Tháng - Năm", "Xem đồng hồ"] },
      { chapter: "Chương 7: Các số đến 100 000", lessons: ["Các số có năm chữ số", "So sánh các số trong phạm vi 100 000"] },
      { chapter: "Chương 8: Phép cộng, phép trừ trong phạm vi 100 000", lessons: ["Phép cộng trong phạm vi 100 000", "Phép trừ trong phạm vi 100 000", "Tiền Việt Nam"] },
      { chapter: "Chương 9: Phép nhân, phép chia trong phạm vi 100 000", lessons: ["Nhân số có năm chữ số với số có một chữ số", "Chia số có năm chữ số cho số có một chữ số"] }
    ],
    "4": [
      { chapter: "Chương 1: Số tự nhiên", lessons: ["Ôn tập các số đến 100 000", "Biểu thức có chứa chữ", "Các số có sáu chữ số", "Hàng và lớp", "So sánh các số có nhiều chữ số"] },
      { chapter: "Chương 2: Các phép tính với số tự nhiên", lessons: ["Phép cộng", "Phép trừ", "Biểu thức có chứa hai chữ, ba chữ", "Tính chất giao hoán, kết hợp của phép cộng", "Tìm hai số khi biết tổng và hiệu của hai số đó"] },
      { chapter: "Chương 3: Hình học và đo lường", lessons: ["Góc nhọn, góc tù, góc bẹt", "Hai đường thẳng vuông góc", "Hai đường thẳng song song", "Hình bình hành", "Hình thoi", "Yến, tạ, tấn", "Giây, thế kỉ"] },
      { chapter: "Chương 4: Phép nhân và phép chia", lessons: ["Nhân với số có một chữ số", "Nhân với số có hai, ba chữ số", "Chia cho số có một chữ số", "Chia cho số có hai, ba chữ số"] },
      { chapter: "Chương 5: Phân số", lessons: ["Khái niệm phân số", "Phân số và phép chia số tự nhiên", "Phân số bằng nhau", "Rút gọn phân số", "Quy đồng mẫu số các phân số", "So sánh hai phân số"] },
      { chapter: "Chương 6: Các phép tính với phân số", lessons: ["Phép cộng phân số", "Phép trừ phân số", "Phép nhân phân số", "Phép chia phân số", "Tìm phân số của một số"] }
    ],
    "5": [
      { chapter: "Chương 1: Ôn tập và bổ sung về phân số", lessons: ["Ôn tập về phân số", "Hỗn số", "Giải toán về tỉ số thuận, tỉ số nghịch"] },
      { chapter: "Chương 2: Số thập phân. Các phép tính với số thập phân", lessons: ["Khái niệm số thập phân", "So sánh hai số thập phân", "Cộng, trừ, nhân, chia số thập phân", "Viết các số đo dưới dạng số thập phân", "Tỉ số phần trăm"] },
      { chapter: "Chương 3: Hình học", lessons: ["Hình tam giác", "Hình thang", "Hình tròn, đường tròn", "Hình hộp chữ nhật, hình lập phương", "Hình trụ, hình cầu"] },
      { chapter: "Chương 4: Số đo thời gian. Toán chuyển động đều", lessons: ["Bảng đơn vị đo thời gian", "Cộng, trừ, nhân, chia số đo thời gian", "Vận tốc", "Quãng đường", "Thời gian"] },
      { chapter: "Chương 5: Ôn tập", lessons: ["Ôn tập về số tự nhiên, phân số, số thập phân", "Ôn tập về các phép tính", "Ôn tập về hình học", "Ôn tập về đo lường"] }
    ]
  },
  "Tiếng Việt": {
    "1": [
      { chapter: "Chủ đề 1: Những bài học đầu tiên", lessons: ["Âm a", "Âm b", "Âm c", "Âm d, đ", "Âm e, ê"] },
      { chapter: "Chủ đề 2: Bé và bà", lessons: ["Âm o, ô", "Âm ơ, v", "Âm i, u", "Âm ư, n", "Âm m, p"] },
      { chapter: "Chủ đề 3: Đi chợ", lessons: ["Âm g, h", "Âm l, h", "Âm k, kh", "Âm nh, ph", "Âm th, ch"] },
      { chapter: "Chủ đề 4: Kỳ nghỉ", lessons: ["Âm n, m", "Âm r, s", "Âm t, tr", "Âm v, x"] },
      { chapter: "Chủ đề 5: Ở nhà", lessons: ["Vần ai, ay", "Vần oi, ôi, ơi", "Vần ui, ưi", "Vần uôi, ươi"] },
      { chapter: "Chủ đề 6: Đi học", lessons: ["Vần am, ap", "Vần âm, ấp", "Vần em, ep", "Vần im, ip"] },
      { chapter: "Chủ đề 7: Thể thao", lessons: ["Vần au, ao", "Vần âu, eu", "Vần iu, ưu", "Vần iêu, ươu"] },
      { chapter: "Chủ đề 8: Đồ chơi - Trò chơi", lessons: ["Vần an, at", "Vần ăn, ăt", "Vần ân, ât", "Vần en, et"] }
    ],
    "2": [
      { chapter: "Chủ đề 1: Em lớn lên từng ngày", lessons: ["Tôi là học sinh lớp 2", "Ngày hôm qua đâu rồi?", "Niềm vui của Bi và Bống", "Làm việc thật là vui"] },
      { chapter: "Chủ đề 2: Đi học vui sao", lessons: ["Danh sách học sinh", "Cầu vồng", "Cái trống trường em", "Mẫu giấy vụn"] },
      { chapter: "Chủ đề 3: Niềm vui tuổi thơ", lessons: ["Yêu lắm trường ơi", "Cuốn sách của em", "Cô giáo lớp em", "Thời khóa biểu"] },
      { chapter: "Chủ đề 4: Mái ấm gia đình", lessons: ["Cánh cửa nhớ bà", "Bà nội, bà ngoại", "Chuyện quả bầu", "Tiếng võng kêu"] },
      { chapter: "Chủ đề 5: Vẻ đẹp thiên nhiên", lessons: ["Lũy tre", "Họa mi hót", "Tết đến rồi", "Giọt sương"] }
    ],
    "3": [
      { chapter: "Chủ đề 1: Những trải nghiệm thú vị", lessons: ["Ngày gặp lại", "Về thăm quê", "Cánh rừng trong cát", "Thả diều"] },
      { chapter: "Chủ đề 2: Mái nhà yêu thương", lessons: ["Ngưỡng cửa", "Mẹ", "Ông ngoại", "Anh em sinh đôi"] },
      { chapter: "Chủ đề 3: Cộng đồng", lessons: ["Lớp học mật ngữ", "Đơn xin vào Đội", "Ngày hội rừng xanh", "Lời giải toán đặc biệt"] },
      { chapter: "Chủ đề 4: Quê hương tươi đẹp", lessons: ["Cảnh đẹp non sông", "Luôn có bạn đồng hành", "Mặt trời xanh của tôi", "Hạt thóc"] },
      { chapter: "Chủ đề 5: Những sắc màu thiên nhiên", lessons: ["Bầu trời", "Mưa", "Sông Hương", "Hoa cỏ mùa xuân"] }
    ],
    "4": [
      { chapter: "Chủ đề 1: Bầu trời tuổi thơ", lessons: ["Điều kì diệu", "Thi nhạc", "Gặt chữ trên đỉnh Phù Lá", "Dàn nhạc mùa hè"] },
      { chapter: "Chủ đề 2: Trải nghiệm và khám phá", lessons: ["Công chúa và người dẫn chuyện", "Học nấu ăn", "Bàn tay cô giáo", "Cánh diều tuổi thơ"] },
      { chapter: "Chủ đề 3: Niềm vui sáng tạo", lessons: ["Bầu trời trong quả trứng", "Tiếng nói của cỏ cây", "Tập làm văn", "Nhà phát minh 6 tuổi"] },
      { chapter: "Chủ đề 4: Chắp cánh ước mơ", lessons: ["Nếu chúng mình có phép lạ", "Anh em sinh đôi", "Bốn anh tài", "Trống đồng Đông Sơn"] },
      { chapter: "Chủ đề 5: Vòng tay bè bạn", lessons: ["Bè xuôi sông La", "Người ăn xin", "Sự tích hồ Ba Bể", "Nàng tiên Ốc"] }
    ],
    "5": [
      { chapter: "Chủ đề 1: Thế giới tuổi thơ", lessons: ["Trái đất xanh của em", "Hạt nảy mầm", "Tiếng đàn ba-la-lai-ca trên sông Đà", "Kì diệu rừng xanh"] },
      { chapter: "Chủ đề 2: Con người Việt Nam", lessons: ["Thư gửi các học sinh", "Quang cảnh làng mạc ngày mùa", "Lòng dân", "Sắc màu em yêu"] },
      { chapter: "Chủ đề 3: Vì hạnh phúc con người", lessons: ["Bài ca về trái đất", "Ê-mi-lị, con...", "Sự sụp đổ của chế độ a-pác-thai", "Tác phẩm của Si-le và tên phát xít"] },
      { chapter: "Chủ đề 4: Giữ lấy màu xanh", lessons: ["Chuyện một khu vườn nhỏ", "Tiếng vọng", "Mùa thảo quả", "Hành trình của bầy ong"] },
      { chapter: "Chủ đề 5: Vì một thế giới hòa bình", lessons: ["Ngu công xã Trịnh Tường", "Ca dao về lao động sản xuất", "Thầy thuốc như mẹ hiền", "Về ngôi nhà đang xây"] }
    ]
  },
  "Tự nhiên và Xã hội": {
    "1": [
      { chapter: "Chủ đề 1: Gia đình", lessons: ["Thành viên trong gia đình", "Nhà ở của em", "An toàn khi ở nhà"] },
      { chapter: "Chủ đề 2: Trường học", lessons: ["Lớp học của em", "Các hoạt động ở trường", "Giữ an toàn khi ở trường"] },
      { chapter: "Chủ đề 3: Cộng đồng địa phương", lessons: ["Nơi em sinh sống", "Các hoạt động ở địa phương", "An toàn khi đi đường"] }
    ],
    "2": [
      { chapter: "Chủ đề 1: Gia đình", lessons: ["Nghề nghiệp của người thân", "Phòng tránh ngộ độc khi ở nhà", "Giữ sạch nhà ở"] },
      { chapter: "Chủ đề 2: Trường học", lessons: ["Ngày hội việc tốt", "Giữ vệ sinh trường học", "An toàn khi tham gia các hoạt động ở trường"] }
    ],
    "3": [
      { chapter: "Chủ đề 1: Gia đình", lessons: ["Họ hàng nội, ngoại", "Phòng tránh hỏa hoạn khi ở nhà", "Vệ sinh xung quanh nhà ở"] },
      { chapter: "Chủ đề 2: Trường học", lessons: ["Trường học của em", "Giữ vệ sinh trường học", "An toàn khi tham gia các hoạt động ở trường"] }
    ]
  },
  "Khoa học": {
    "4": [
      { chapter: "Chủ đề 1: Chất", lessons: ["Tính chất của nước", "Sự chuyển thể của nước", "Vai trò của nước", "Bảo vệ nguồn nước", "Tính chất của không khí", "Vai trò của không khí"] },
      { chapter: "Chủ đề 2: Năng lượng", lessons: ["Ánh sáng và sự truyền ánh sáng", "Vai trò của ánh sáng", "Âm thanh", "Sự lan truyền âm thanh", "Nhiệt độ và nhiệt kế"] }
    ],
    "5": [
      { chapter: "Chủ đề 1: Chất", lessons: ["Thành phần và tính chất của đất", "Ô nhiễm và bảo vệ môi trường đất", "Hỗn hợp và dung dịch", "Sự biến đổi hóa học"] },
      { chapter: "Chủ đề 2: Năng lượng", lessons: ["Năng lượng mặt trời, gió và nước chảy", "Năng lượng điện", "Sử dụng năng lượng điện an toàn, tiết kiệm"] }
    ]
  },
  "Tiếng Anh": {
    "1": [
      { chapter: "Unit 1: Hello", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 2: In the dining room", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 3: At the street market", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 4: In the bedroom", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 5: At the fish and chip shop", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 6: In the park", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 7: In the kitchen", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 8: In the toy shop", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] }
    ],
    "2": [
      { chapter: "Unit 1: At my birthday party", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 2: In the backyard", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 3: At the seaside", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 4: In the countryside", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 5: In the classroom", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 6: On the farm", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 7: In the kitchen", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 8: In the village", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] }
    ],
    "3": [
      { chapter: "Unit 1: Hello", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 2: Our names", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 3: Our friends", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 4: Our bodies", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 5: My hobbies", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 6: Our school", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 7: Classroom instructions", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 8: My school things", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 9: Our colours", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 10: Break time activities", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] }
    ],
    "4": [
      { chapter: "Unit 1: My friends", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 2: Time and daily routines", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 3: My week", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 4: My birthday party", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 5: Things we can do", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 6: Our school facilities", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 7: Our school subjects", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 8: My favourite subjects", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 9: Our sports day", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 10: Our summer holidays", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] }
    ],
    "5": [
      { chapter: "Unit 1: All about me", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 2: Our holidays", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 3: My birthday party", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 4: My favourite books", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 5: My favourite pets", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 6: Our school trip", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 7: Our free-time activities", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 8: My favourite TV programmes", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 9: Our outdoor activities", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
      { chapter: "Unit 10: Our zoo visit", lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] }
    ]
  },
  "Lịch sử và Địa lý": {
    "4": [
      { chapter: "Chủ đề 1: Địa phương em", lessons: ["Vị trí địa lí và thiên nhiên", "Dân cư và hoạt động sản xuất", "Văn hóa và lịch sử địa phương"] },
      { chapter: "Chủ đề 2: Trung du và miền núi Bắc Bộ", lessons: ["Thiên nhiên vùng Trung du và miền núi Bắc Bộ", "Dân cư và hoạt động sản xuất", "Một số nét văn hóa đặc sắc"] },
      { chapter: "Chủ đề 3: Đồng bằng Bắc Bộ", lessons: ["Thiên nhiên vùng Đồng bằng Bắc Bộ", "Dân cư và hoạt động sản xuất", "Thăng Long - Hà Nội"] },
      { chapter: "Chủ đề 4: Duyên hải miền Trung", lessons: ["Thiên nhiên vùng Duyên hải miền Trung", "Dân cư và hoạt động sản xuất", "Cố đô Huế", "Phố cổ Hội An"] },
      { chapter: "Chủ đề 5: Tây Nguyên", lessons: ["Thiên nhiên vùng Tây Nguyên", "Dân cư và hoạt động sản xuất", "Lễ hội Cồng chiêng Tây Nguyên"] },
      { chapter: "Chủ đề 6: Nam Bộ", lessons: ["Thiên nhiên vùng Nam Bộ", "Dân cư và hoạt động sản xuất", "Địa đạo Củ Chi"] }
    ],
    "5": [
      { chapter: "Chủ đề 1: Đất nước và con người Việt Nam", lessons: ["Vị trí địa lí, hình dạng và lãnh thổ", "Vùng biển Việt Nam", "Dân cư và các dân tộc Việt Nam"] },
      { chapter: "Chủ đề 2: Các nước láng giềng", lessons: ["Campuchia và Lào", "Trung Quốc"] },
      { chapter: "Chủ đề 3: Các châu lục", lessons: ["Châu Á", "Châu Âu", "Châu Phi", "Châu Mỹ", "Châu Đại Dương và Châu Nam Cực"] }
    ]
  },
  "Đạo đức": {
    "1": [
      { chapter: "Chủ đề: Yêu thương gia đình", lessons: ["Kể chuyện về gia đình", "Quan tâm, chăm sóc người thân"] },
      { chapter: "Chủ đề: Tự chăm sóc bản thân", lessons: ["Giữ gìn vệ sinh thân thể", "Ăn uống đủ chất, đúng giờ"] }
    ],
    "2": [
      { chapter: "Chủ đề: Quý trọng thời gian", lessons: ["Thời gian là vàng", "Lập thời gian biểu"] },
      { chapter: "Chủ đề: Nhận lỗi và sửa lỗi", lessons: ["Dũng cảm nhận lỗi", "Biết sửa lỗi sai"] }
    ],
    "3": [
      { chapter: "Chủ đề: An toàn giao thông", lessons: ["Đi bộ an toàn", "Tuân thủ tín hiệu đèn giao thông"] },
      { chapter: "Chủ đề: Tôn trọng tài sản", lessons: ["Giữ gìn đồ dùng công cộng", "Không tự ý sử dụng đồ của người khác"] }
    ],
    "4": [
      { chapter: "Chủ đề: Lòng biết ơn", lessons: ["Biết ơn thầy giáo, cô giáo", "Biết ơn những người có công với quê hương"] },
      { chapter: "Chủ đề: Trung thực", lessons: ["Trung thực trong học tập", "Trung thực trong cuộc sống"] }
    ],
    "5": [
      { chapter: "Chủ đề: Tình bạn", lessons: ["Tình bạn đẹp", "Giúp đỡ bạn bè khi gặp khó khăn"] },
      { chapter: "Chủ đề: Bảo vệ môi trường", lessons: ["Em yêu thiên nhiên", "Hành động bảo vệ môi trường"] }
    ]
  },
  "Tin học": {
    "3": [
      { chapter: "Chủ đề A: Máy tính và em", lessons: ["Thông tin và quyết định", "Các bộ phận của máy tính", "Làm quen với chuột máy tính", "Làm quen với bàn phím", "Làm việc với máy tính", "Em tập gõ bàn phím"] },
      { chapter: "Chủ đề B: Mạng máy tính và Internet", lessons: ["Thông tin trên Internet", "Xem tin tức và giải trí trên Internet"] },
      { chapter: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: ["Sắp xếp để dễ tìm", "Làm quen với thư mục"] },
      { chapter: "Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số", lessons: ["An toàn khi sử dụng máy tính"] },
      { chapter: "Chủ đề E: Ứng dụng tin học", lessons: ["Em tập vẽ với phần mềm Paint", "Sử dụng phần mềm học tập"] }
    ],
    "4": [
      { chapter: "Chủ đề A: Máy tính và em", lessons: ["Phần cứng và phần mềm máy tính", "Gõ bàn phím đúng cách"] },
      { chapter: "Chủ đề B: Mạng máy tính và Internet", lessons: ["Tìm kiếm thông tin trên Internet", "Thông tin đáng tin cậy"] },
      { chapter: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: ["Tìm kiếm tệp và thư mục"] },
      { chapter: "Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số", lessons: ["Bản quyền nội dung số"] },
      { chapter: "Chủ đề E: Ứng dụng tin học", lessons: ["Soạn thảo văn bản tiếng Việt", "Định dạng đoạn văn bản", "Chèn hình ảnh và bảng biểu", "Thiết kế bài trình chiếu", "Hiệu ứng trong bài trình chiếu"] },
      { chapter: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: ["Làm quen với lập trình trực quan Scratch", "Tạo chương trình đơn giản"] }
    ],
    "5": [
      { chapter: "Chủ đề A: Máy tính và em", lessons: ["Cấu trúc máy tính và thiết bị ngoại vi"] },
      { chapter: "Chủ đề B: Mạng máy tính và Internet", lessons: ["Sử dụng Internet an toàn và hiệu quả", "Thư điện tử (Email)"] },
      { chapter: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: ["Cây thư mục và quản lý tệp tin"] },
      { chapter: "Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số", lessons: ["Tôn trọng quyền tác giả", "Ứng xử văn minh trên mạng"] },
      { chapter: "Chủ đề E: Ứng dụng tin học", lessons: ["Soạn thảo văn bản nâng cao", "Trình chiếu đa phương tiện", "Sử dụng phần mềm đồ họa"] },
      { chapter: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: ["Lập trình Scratch: Biến và phép toán", "Lập trình Scratch: Cấu trúc điều kiện", "Lập trình Scratch: Cấu trúc lặp", "Dự án học tập với Scratch"] }
    ]
  },
  "Công nghệ": {
    "3": [
      { chapter: "Chủ đề 1: Tự làm đồ chơi", lessons: ["Làm thước kẻ bằng giấy", "Làm xe đồ chơi"] },
      { chapter: "Chủ đề 2: An toàn với đồ điện", lessons: ["Sử dụng quạt điện an toàn", "Sử dụng máy thu thanh"] }
    ],
    "4": [
      { chapter: "Chủ đề 1: Trồng hoa, cây cảnh", lessons: ["Lợi ích của hoa và cây cảnh", "Các loại chậu trồng hoa và cây cảnh", "Gieo hạt và trồng cây con trong chậu"] }
    ],
    "5": [
      { chapter: "Chủ đề 1: Thiết kế sản phẩm", lessons: ["Phác thảo ý tưởng thiết kế", "Lựa chọn vật liệu phù hợp"] },
      { chapter: "Chủ đề 2: Lắp ráp mô hình", lessons: ["Lắp ráp mô hình xe cần cẩu", "Lắp ráp mô hình máy bay"] }
    ]
  }
};
