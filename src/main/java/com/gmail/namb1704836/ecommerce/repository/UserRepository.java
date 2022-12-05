package com.gmail.namb1704836.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gmail.namb1704836.ecommerce.domain.User;

/**
 * A repository for {@link User} objects providing a set of JPA methods for
 * working with the database. Inherits interface {@link JpaRepository}.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see User
 * @see JpaRepository
 */
public interface UserRepository extends JpaRepository<User, Long> {
	/**
	 * Returns the user from the database that has the same name as the value of the
	 * input parameter.
	 *
	 * @param username user name to return.
	 * @return The {@link User} class object.
	 */
	User findByUsername(String username);

	/**
	 * Returns the user from the database that has the same activation code as the
	 * value of the input parameter.
	 *
	 * @param code activation code to return.
	 * @return The {@link User} class object.
	 */
	User findByActivationCode(String code);

	/**
	 * Returns the user from the database that has the same email as the value of
	 * the input parameter.
	 *
	 * @param email user email to return.
	 * @return The {@link User} class object.
	 */
	User findByEmail(String email);

	/**
	 * Returns the user from the database that has the same password reset code as
	 * the value of the input parameter.
	 *
	 * @param code password reset code.
	 * @return The {@link User} class object.
	 */
	User findByPasswordResetCode(String code);
}