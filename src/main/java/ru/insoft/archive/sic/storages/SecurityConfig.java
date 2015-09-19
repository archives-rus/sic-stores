package ru.insoft.archive.sic.storages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.stereotype.Component;
import ru.insoft.archive.sic.storages.serivces.admin.AppUserDetailsService;

@Component
@EnableWebSecurity
/**
 * Настройка система аутентификации
 */
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AppUserDetailsService uds;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(uds)
				.passwordEncoder(new Md5PasswordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.authorizeRequests()
				.antMatchers("/js/libs/login.min.js", "/js/login/login.min.js", 
						"/css/libs/login.min.css", "/css/login/login.min.css")
				.permitAll()
				.anyRequest().authenticated()
				.and()
				.formLogin()
				.loginPage("/enter.html")
				.failureUrl("/failedLogin")
				.loginProcessingUrl("/login")
				.permitAll()
				.and()
				.logout()
				.permitAll()
				.and()
				.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
//				.csrf().disable();
				.csrf().csrfTokenRepository(csrfTokenRepository());
	}

	private static CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}
}
