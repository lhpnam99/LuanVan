package com.gmail.namb1704836.ecommerce.service.Impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;

import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.gmail.namb1704836.ecommerce.domain.Role;
import com.gmail.namb1704836.ecommerce.domain.User;
import com.gmail.namb1704836.ecommerce.repository.UserRepository;
import com.gmail.namb1704836.ecommerce.service.UserService;

@SpringBootTest
class UserServiceImplTest {
	@Autowired
	private UserService userService;

	@MockBean
	private UserRepository userRepository;

	@MockBean
	private MailSender mailSender;

	@Test
	public void addUser() {
		User user = new User();
		user.setEmail("testMail@test.com");

		boolean isUserCreated = userService.addUser(user);

		assertTrue(isUserCreated);
		assertNotNull(user.getActivationCode());
		assertTrue(CoreMatchers.is(user.getRoles()).matches(Collections.singleton(Role.USER)));

		verify(userRepository, times(1)).save(user);
		verify(mailSender, times(1)).send(ArgumentMatchers.eq(user.getEmail()), ArgumentMatchers.eq("Activation code"),
				ArgumentMatchers.anyString());
	}

	@Test
	public void activateUser() {
		User user = new User();
		user.setActivationCode("activationCode");

		doReturn(user).when(userRepository).findByActivationCode("activate");

		boolean isUserActivated = userService.activateUser("activate");

		assertTrue(isUserActivated);
		assertNull(user.getActivationCode());

		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void userSave() {
		User user = new User();
		user.setUsername("User");
		user.setEmail("testMail@test.com");
		user.setPassword("test");

		boolean isUserCreated = userService.addUser(user);

		assertTrue(isUserCreated);

		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void loadUserByUsername() {
		User user = new User();
		user.setEmail("testMail@test.com");

		when(userRepository.findByEmail("testMail@test.com")).thenReturn(user);

		verify(userRepository, times(1)).findByEmail("testMail@test.com");

		assertEquals("testMail@test.com", user.getEmail());
	}
}