package ru.insoft.archive.sic.storages.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;

public interface DescriptorValueRepo extends JpaRepository<DescriptorValue, Long> {

	public List<DescriptorValue> findByGroupCode(@Param("code") String code);

	public List<DescriptorValue> findByParent(@Param("parent") DescriptorValue parent);

	public DescriptorValue findOneByCode(String code);
}
