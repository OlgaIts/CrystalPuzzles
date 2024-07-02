from datetime import datetime
from typing import Optional

from common.service.base_service import BaseService
from service.users.models import User
from service.identity.security import hash_password, verify_password
from service.users.schemas import CreateUserSchema, UserChangePasswordSchema, UserFilterSchema
from service.users.unit_of_work import UserUOW


class UserService(BaseService):
    @staticmethod
    async def get_by_email(
        uow: UserUOW,
        email: str
    ):
        async with uow:
            check = await uow.repo.get_by_email(email)
            return check

    async def add(
        self,
        uow: UserUOW,
        user: CreateUserSchema,
        **kwargs
    ):
        check = await self.get_by_email(uow, user.email)
        if check is None or check.deleted:
            data = user.model_dump()
            password = data.pop("password")
            data["hashed_password"] = hash_password(password)
            # data["code"] = int(generated_code())  # ToDo: Реализовать после создания метода подтверждения почты
            data["is_verified"] = True
            data["is_active"] = True
            async with uow:
                result = await uow.repo.add(data)
                await uow.commit()
                return result
        return None

    @staticmethod
    async def change_password(
            uow: UserUOW,
            data: UserChangePasswordSchema,
            user: User
    ):
        if verify_password(data.old_password, user.hashed_password):
            data = {
                "id": user.id,
                "hashed_password": hash_password(data.new_password),
                "date_update": datetime.now()
            }
            async with uow:
                result = await uow.repo.edit(data)
                await uow.commit()
                return result
        return None

    @staticmethod 
    async def verify(
            uow: UserUOW,
            user_id: int
    ):
        data = {
            "id": user_id,
            "is_verified": True,
            "code": None,
            "date_update": datetime.now()
        }
        async with uow:
            result = await uow.repo.edit(data)
            await uow.commit()
            return result

    @staticmethod 
    async def get_all_by_filters(
            uow: UserUOW,
            filters: UserFilterSchema, 
            deleted: Optional[bool]
    ):
        async with uow:
            result = await uow.repo.get_all_user_by_filter(filters, deleted)
            return result

    @staticmethod 
    async def get_all_students_by_filter(
            uow: UserUOW,
            filters: UserFilterSchema
    ):
        async with uow:
            result = await uow.repo.get_all_students_by_filter(filters)
            return result

    @staticmethod 
    async def set_photo(
        uow: UserUOW,
        photo: bytes,
        user_id: int
    ):
        data = {
            "id": user_id,
            "photo": photo,
            "date_update": datetime.now(),
            "avatar": None
        }
        async with uow:
            result = await uow.repo.edit(data)
            await uow.commit()
            return result

    @staticmethod 
    async def delete_photo(
        uow: UserUOW,
        user_id: int
    ):
        data = {
            "id": user_id,
            "photo": None,
            "date_update": datetime.now()
        }
        async with uow:
            result = await uow.repo.edit(data)
            await uow.commit()
            return result

    @staticmethod
    async def get_photo(
        uow: UserUOW,
        user_id: int
    ):
        async with uow:
            user = await uow.repo.get(user_id)
            return user.photo

    @staticmethod
    async def set_avatar(
        uow: UserUOW,
        avatar_schema,
        user_id: int
    ):
        data = {
            "id": user_id,
            "avatar": avatar_schema.avatar_id,
            "date_update": datetime.now(),
            "photo": None
        }
        async with uow:
            result = await uow.repo.edit(data)
            await uow.commit()
            return result
