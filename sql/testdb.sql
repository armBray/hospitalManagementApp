USE HospitalManagementApp;

INSERT INTO `appointment` (`patient_name`, `department`, `doctor_name`, `date`, `time`, `email`, `phone`) VALUES
('patientNameTest', 'General', 'B.Rossi', '15/06/2023', '05:02 PM', 'rossiTest@gmail.com', '456789123');

INSERT INTO `complain` (`message`, `name`, `email`, `subject`) VALUES
('message1Test', 'name1', 'name1Test@gmail.com', 'subject1');

INSERT INTO `departments` (`department_name`, `department_desc`) VALUES
('Intensive Care Unit (ICU)Test', 'ICU desc.');

INSERT INTO `doctor` (`first_name`, `last_name`, `email`, `dob`, `gender`, `address`, `phone`, `image`, `department`, `biography`) VALUES
('RossiTest', 'Bianchi', 'bianchiTest@gmail.com', '18/06/2023', 'male', 'via Tiburtina, Roma', '456789123', 'img.jpg', 'Intensive Care Unit (ICU)', 'bio');

INSERT INTO `employee` (`name`, `email`, `contact`, `join_date`, `role`, `salary`) VALUES
('emp1Test', 'emp1Test@gmail.com', '897646566', '26/03/2023', 'Receptionist', '3000');

INSERT INTO `leaves` (`employee`, `emp_id`, `leave_type`, `date_from`, `date_to`, `reason`) VALUES
('emp1Test', 4, 'Medical Leave', '13/03/2023', '28/03/2023', 'reason1');

INSERT INTO `login` (`username`, `password`, `email`) VALUES
('testTest', 'testTest', 'loginTest@gmail.com');

INSERT INTO `store` (`name`, `p_date`, `expire`, `expire_end`, `price`, `quantity`) VALUES
('art1Test', '20/03/2023', '2', '19/07/2023', '8', '34');

INSERT INTO `temp` (`id`, `email`, `token`) VALUES
(22, 'tempTest@gmail.com', '46fn0pl3');

INSERT INTO `users` (`username`, `email`, `password`, `email_status`) VALUES
('user1Test', 'user1Test@gmail.com', 'psw1', 'verified');

INSERT INTO `verify` (`username`, `email`, `token`) VALUES
('user1Test', 'user1Test@gmail.com', 'lp5ux5ik');
